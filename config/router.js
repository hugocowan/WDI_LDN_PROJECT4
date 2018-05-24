const router = require('express').Router();
const computers = require('../controllers/computers');
const auth = require('../controllers/auth');

router.route('/computers')
  .get(computers.index)
  .post(computers.create);

router.route('/computers/:id')
  .get(computers.show)
  .put(computers.update)
  .delete(computers.delete);

router.route('/parts')
  .get(computers.index)
  .post(computers.create);

router.route('/parts/:id')
  .get(computers.show)
  .put(computers.update)
  .delete(computers.delete);

router.post('/computers/:id/comments', computers.commentCreate);
router.delete('/computers/:id/comments/:commentId', computers.commentDelete);

router.post('/register', auth.register);
router.post('/login', auth.login);



module.exports = router;
