<?php
session_start();
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/inc/security.php';
require_once __DIR__ . '/inc/csrf.php';
csrf_check();
remember_me_try($pdo);

$err = '';
if (!empty($_SESSION['uid'])) {
  header('Location: /portfolio_with_backend/admin/');
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!login_rate_check()) {
    $err = 'Zu viele Versuche. Bitte später erneut.';
  } else {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    if ($username === '' || $password === '') {
      $err = 'Bitte Benutzername und Passwort angeben.';
    } else {
      $stmt = $pdo->prepare('SELECT id, username, password, is_admin FROM users WHERE username = ?');
      $stmt->execute([$username]);
      $u = $stmt->fetch();
      if ($u && password_verify($password, $u['password'])) {
        login_rate_bump(true);
        $_SESSION['uid'] = $u['id'];
        $_SESSION['username'] = $u['username'];
        $_SESSION['is_admin'] = (int)$u['is_admin'] === 1;
        if (!empty($_POST['remember'])) remember_me_set($u['id']);
        header('Location: /portfolio_with_backend/admin/');
        exit;
      } else {
        login_rate_bump(false);
        $err = 'Login fehlgeschlagen.';
      }
    }
  }
}
?>
<!DOCTYPE html>
<html lang="de" data-bs-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login · Admin</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="/portfolio_with_backend/admin/styles.css" rel="stylesheet">
</head>
<body class="bg-gradient-dark d-flex align-items-center" style="min-height:100vh">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card p-4 glassy">
          <h1 class="h4 mb-3">Admin Login</h1>
          <?php if ($err): ?><div class="alert alert-danger"><?=$err?></div><?php endif; ?>
          <form method="post">
            <?php csrf_field(); ?>
            <div class="mb-3">
              <label class="form-label">Benutzername</label>
              <input class="form-control" name="username" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Passwort</label>
              <input type="password" class="form-control" name="password" required>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" name="remember" id="remember">
              <label class="form-check-label" for="remember">Angemeldet bleiben</label>
            </div>
            <button class="btn btn-violet w-100">Einloggen</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
