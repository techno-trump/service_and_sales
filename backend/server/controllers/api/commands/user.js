import db from '../../../../db';

export const getUsersList = async (req, res) => {
  const users = await db.User.all({});
    console.log(Object.keys(users));
  res.json(users);
};
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await db.User.findOne({ where: { id: id } });
  res.json({ name: user.name, surname: user.surname });
};