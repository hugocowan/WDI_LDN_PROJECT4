const router = require('express').Router();
const computers = require('../controllers/computers');
const parts = require('../controllers/parts');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/computers')
  .get(computers.index)
  .post(secureRoute, computers.create);

router.route('/computers/:id')
  .get(computers.show)
  .put(secureRoute, computers.update)
  .delete(secureRoute, computers.delete);

router.post('/computers/:id/comments', secureRoute, computers.commentCreate);
router.delete('/computers/:id/comments/:commentId', secureRoute, computers.commentDelete);

router.route('/parts')
  .get(parts.index)
  .post(secureRoute, parts.create);

router.route('/parts/:id')
  .get(parts.show)
  .put(secureRoute, parts.update)
  .delete(secureRoute, parts.delete);


router.post('/register', auth.register);
router.post('/login', auth.login);



module.exports = router;
