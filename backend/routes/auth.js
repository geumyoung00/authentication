const express = require('express');
const { add, get } = require('../data/user');
const { createJSONToken, isValidPassword } = require('../util/auth');
const { isValidEmail, isValidText } = require('../util/validation');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = '유효하지 않은 이메일입니다.';
  } else {
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = '이미 등록된 이메일입니다.';
      }
    } catch (error) {}
  }

  if (!isValidText(data.password, 6)) {
    errors.password = '유효하지 않은 비밀번호. 길이는 6자 이상이어야 합니다.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: '유효성 검사 오류로 인해 사용자 가입에 실패했습니다.',
      errors,
    });
  }

  try {
    const createdUser = await add(data);
    const authToken = createJSONToken(createdUser.email);
    res.status(201).json({
      message: '사용자로 등록되었습니다.',
      user: createdUser,
      token: authToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({ message: '인증 실패.' });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: 'email 또는 password를 확인해 주세요.',
      errors: { credentials: 'email이나 password를 확인해 주세요.' },
    });
  }

  const token = createJSONToken(email);
  res.json({ token });
});

module.exports = router;
