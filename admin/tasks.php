
<?php
require_once __DIR__ . '/inc/auth.php';
require_once __DIR__ . '/inc/audit.php';
require_once __DIR__ . '/inc/csrf.php';
csrf_check();
require_admin();
require_once __DIR__ . '/inc/csrf.php';
csrf_check();
// Upload verarbeiten (falls gesetzt)
$uploadedName = null;
if (!empty($_FILES['file_upload']) && $_FILES['file_upload']['error'] === UPLOAD_ERR_OK) {
  $tmp = $_FILES['file_upload']['tmp_name'];
  $orig = basename($_FILES['file_upload']['name']);
  $safe = preg_replace('~[^A-Za-z0-9._-]+~','_', $orig);
  $dir = __DIR__ . '/../uploads';
  if (!is_dir($dir)) { @mkdir($dir, 0777, true); }
  $target = $dir . '/' . time() . '_' . $safe;
  if (move_uploaded_file($tmp, $target)) {
    $uploadedName = basename($target);
  }
}

$action=$_POST['action']??''; $msg=''; $err='';

if ($action==='create') {
  $area_id=(int)($_POST['area_id']??0); $title=trim($_POST['title']??''); $description=$_POST['description']??null; $hint=$_POST['hint']??null; $solution_file=$_POST['solution_file']??null;
  if ($area_id<=0 || $title==='') $err='Area und Titel sind Pflicht.';
  else { $final_file = $uploadedName ?: $solution_file; $pdo->prepare('INSERT INTO tasks(area_id,title,description,hint,solution_file) VALUES (?,?,?,?,?)')->execute([$area_id,$title,$description,$hint,$final_file]); $msg='Aufgabe erstellt.';
  audit_log('create','task', $pdo->lastInsertId(), $title); }
}
if ($action==='update') {
  $id=(int)($_POST['id']??0); $area_id=(int)($_POST['area_id']??0); $title=trim($_POST['title']??''); $description=$_POST['description']??null; $hint=$_POST['hint']??null; $solution_file=$_POST['solution_file']??null;
  if ($id<=0) $err='ID fehlt.';
  else { $final_file = $uploadedName ?: $solution_file; $pdo->prepare('UPDATE tasks SET area_id=?, title=?, description=?, hint=?, solution_file=? WHERE id=?')->execute([$area_id,$title,$description,$hint,$final_file,$id]); $msg='Aufgabe aktualisiert.';
  audit_log('update','task', $id, $title); }
}
if ($action==='delete') {
  $id=(int)($_POST['id']??0); if ($id>0) { $pdo->prepare('DELETE FROM tasks WHERE id=?')->execute([$id]); $msg='Aufgabe gelöscht.';
  audit_log('delete','task', $id, 'delete'); }
}

$areas=$pdo->query('SELECT id,name FROM areas ORDER BY name')->fetchAll();
$area_map = []; foreach($areas as $a){ $area_map[$a['id']]=$a['name']; }
$rows=$pdo->query('SELECT * FROM tasks ORDER BY id DESC')->fetchAll();

include __DIR__ . '/inc/header.php';
?>
<div class="d-flex justify-content-between align-items-center mb-3">
  <h1 class="h4">Aufgaben</h1>
  <button class="btn btn-violet" data-bs-toggle="modal" data-bs-target="#createModal">Neue Aufgabe</button>
</div>
<?php if($msg):?><div class="alert alert-success"><?=$msg?></div><?php endif; ?>
<?php if($err):?><div class="alert alert-danger"><?=$err?></div><?php endif; ?>

<div class="card p-0">
<table class="table table-dark table-hover mb-0">
  <thead><tr><th>ID</th><th>Area</th><th>Titel</th><th>Hinweis</th><th style="width:160px"></th></tr></thead>
  <tbody>
    <?php foreach($rows as $r): ?>
    <tr>
      <td><?=$r['id']?></td><td><?=htmlspecialchars($area_map[$r['area_id']]??('#'.$r['area_id']))?></td><td><?=$r['title']?></td><td class="text-truncate" style="max-width:260px"><?=$r['hint']?></td>
      <td><button class="btn btn-sm btn-outline-light" data-bs-toggle="collapse" data-bs-target="#t<?=$r['id']?>">Bearbeiten</button></td>
    </tr>
    <tr class="collapse" id="t<?=$r['id']?>">
      <td colspan="5">
        <form method="post" enctype="multipart/form-data"><?php csrf_field(); ?>
          <input type="hidden" name="action" value="update"><input type="hidden" name="id" value="<?=$r['id']?>">
          <div class="row g-3">
            <div class="col-md-3">
              <label class="form-label">Area</label>
              <select class="form-select" name="area_id" required>
                <?php foreach($areas as $a): ?>
                  <option value="<?=$a['id']?>" <?=$a['id']==$r['area_id']?'selected':''?>><?=$a['name']?></option>
                <?php endforeach; ?>
              </select>
            </div>
            <div class="col-md-5"><label class="form-label">Titel</label><input class="form-control" name="title" value="<?=$r['title']?>" required></div>
            <div class="col-md-4"><label class="form-label">Solution File (optional)</label><input class="form-control" name="solution_file" placeholder="z.B. solution.zip" value="<?=$r['solution_file']?>"></div>
            <div class="col-12"><label class="form-label">Beschreibung</label><textarea class="form-control" name="description" rows="4"><?=$r['description']?></textarea></div>
            <div class="col-12"><label class="form-label">Hinweis</label><textarea class="form-control" name="hint" rows="3"><?=$r['hint']?></textarea></div>
          </div>
          <div class="mt-2 d-flex gap-2">
            <button class="btn btn-violet">Speichern</button>
        </form>
        <form method="post" onsubmit="return confirm('Wirklich löschen?')">
          <input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?=$r['id']?>">
          <button class="btn btn-outline-danger">Löschen</button>
        </form>
          </div>
      </td>
    </tr>
    <?php endforeach; ?>
  </tbody>
</table>
</div>

<!-- Create Modal -->
<div class="modal fade" id="createModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content glassy">
      <div class="modal-header"><h5 class="modal-title">Neue Aufgabe</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <form method="post" enctype="multipart/form-data"><?php csrf_field(); ?>
          <input type="hidden" name="action" value="create">
          <div class="mb-3">
            <label class="form-label">Area</label>
            <select class="form-select" name="area_id" required>
              <?php foreach($areas as $a): ?><option value="<?=$a['id']?>"><?=$a['name']?></option><?php endforeach; ?>
            </select>
          </div>
          <div class="mb-3"><label class="form-label">Titel</label><input class="form-control" name="title" required></div>
          <div class="mb-3"><label class="form-label">Beschreibung</label><textarea class="form-control" name="description" rows="4"></textarea></div>
          <div class="mb-3"><label class="form-label">Hinweis</label><textarea class="form-control" name="hint" rows="3"></textarea></div>
          <div class="mb-3"><label class="form-label">Solution File (optional)</label><input class="form-control" name="solution_file" placeholder="z.B. solution.zip"></div>
          <button class="btn btn-violet">Erstellen</button>
        </form>
      </div>
    </div>
  </div>
</div>
<?php include __DIR__ . '/inc/footer.php'; ?>
