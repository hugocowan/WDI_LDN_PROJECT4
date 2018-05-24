const router = require('express').Router();
const computers = require('../controllers/computers');
const cases = require('../controllers/parts/cases');
const cpus = require('../controllers/parts/cpus');
const gpus = require('../controllers/parts/gpus');
const mobos = require('../controllers/parts/mobos');
const psus = require('../controllers/parts/psus');
const rams = require('../controllers/parts/rams');
const storages = require('../controllers/parts/storages');

router.route('/computers')
  .get(computers.show)
  .post(computers.create);

router.route('/computers/:id')
  .get(computers.show)
  .put(computers.update)
  .delete(computers.delete);

router.post('/computers/:id/comments', computers.commentCreate);
router.delete('/computers/:id/comments/:commentId', computers.commentDelete);

router.route('/cases')
  .get(cases.show)
  .post(cases.create);

router.route('/cases/:id')
  .get(cases.show)
  .put(cases.update)
  .delete(cases.delete);

router.route('/cpus')
  .get(cpus.show)
  .post(cpus.create);

router.route('/cpus/:id')
  .get(cpus.show)
  .put(cpus.update)
  .delete(cpus.delete);

router.route('/gpus')
  .get(gpus.show)
  .post(gpus.create);

router.route('/gpus/:id')
  .get(gpus.show)
  .put(gpus.update)
  .delete(gpus.delete);

router.route('/mobos')
  .get(mobos.show)
  .post(mobos.create);

router.route('/mobos/:id')
  .get(mobos.show)
  .put(mobos.update)
  .delete(mobos.delete);

router.route('/psus')
  .get(psus.show)
  .post(psus.create);

router.route('/psus/:id')
  .get(psus.show)
  .put(psus.update)
  .delete(psus.delete);

router.route('/rams')
  .get(rams.show)
  .post(rams.create);

router.route('/rams/:id')
  .get(rams.show)
  .put(rams.update)
  .delete(rams.delete);

router.route('/storages')
  .get(storages.show)
  .post(storages.create);

router.route('/storages/:id')
  .get(storages.show)
  .put(storages.update)
  .delete(storages.delete);
