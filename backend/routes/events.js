const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/event');
const { checkAuth } = require('../util/auth');
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(req.token);
  try {
    const events = await getAll();
    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = '유효하지 않은 장소명입니다.';
  }

  if (!isValidText(data.description)) {
    errors.description = '유효하지 않은 설명입니다.';
  }

  if (!isValidDate(data.date)) {
    errors.date = '유효하지 않은 날짜입니다.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = '유효하지 않은 URL입니다.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: '유효성 검사 오류로 인해 일정을 추가하지 못했습니다.',
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: '일정이 저장되었습니다.', event: data });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = '잘못된 장소명.';
  }

  if (!isValidText(data.description)) {
    errors.description = '잘못된 설명.';
  }

  if (!isValidDate(data.date)) {
    errors.date = '잘못된 날짜.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = '잘못된 이미지 URL.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: '유효성 검사 오류로 인해 일정 업데이트에 실패했습니다.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: '일정이 업데이트 되었습니다.', event: data });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: '이벤트가 삭제되었습니다.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
