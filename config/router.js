const router = require('express').Router();
const computers = require('../controllers/computers');
const parts = require('../controllers/parts');
const comments = require('../controllers/comments');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/computers')
  .get(computers.index)
  .post(secureRoute, computers.create);

router.route('/computers/:id')
  .get(computers.show)
  .put(secureRoute, computers.update)
  .delete(secureRoute, computers.delete);

router.post('/computers/:id/comments', secureRoute, comments.createComputerComment);
router.delete('/computers/:id/comments/:commentId', secureRoute, comments.deleteComputerComment);
router.post('/parts/:id/comments', secureRoute, comments.createPartComment);
router.delete('/parts/:id/comments/:commentId', secureRoute, comments.deletePartComment);

router.route('/parts')
  .get(parts.index)
  .post(secureRoute, parts.create);


router.route('/parts/:id')
  .get(parts.show)
  .put(secureRoute, parts.update)
  .delete(secureRoute, parts.delete);

router.get('/parts/:id/edit', parts.show);


router.post('/register', auth.register);
router.post('/login', auth.login);



module.exports = router;
