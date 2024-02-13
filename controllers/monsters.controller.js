import {
  createMonstersInRepository,
  deleteMonsterFromRepository,
  getMonstersFromRepository,
  updateMonstersInRepository,
} from "../repositories/monsters.repository.js";

export const getMonsters = async (req, res) => {
  try {
    const Monsters = await getMonstersFromRepository({});
    res.status(200).send(Monsters);
  } catch (e) {
    res.status(500).send(`${e.message} failed to fetch a list of monsters`);
  }
};

export const getMonster = async (req, res) => {
  const { id } = req.params;

  try {
    const monster = await getMonstersFromRepository({ _id: id }); // { id: id }
    res.status(200).send(monster);
  } catch (e) {
    res
      .status(500)
      .send(`${e.message}: failed to fetch monster ${id}, does not exist`);
  }
};

export const updateMonster = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const monster = await updateMonstersInRepository({ _id: id }, body);
    res.status(200).send(monster);
  } catch (e) {
    res
      .status(500)
      .send(`${e.message}: failed to fetch monster ${id}, does not exist`);
  }
};

export const deleteMonster = async (req, res) => {
  const { id } = req.params;

  try {
    const monster = await deleteMonsterFromRepository({ _id: id });
    if (monster) {
      res.status(204).send();
    } else {
      res.status(404).send(`${e.message}: failed to delete monster ${id}`); // !What does this do find test case
    }
  } catch (e) {
    res
      .status(500)
      .send(`${e.message}: failed to delete monster ${id}, does not exist`);
  }
};

export const createMonster = async (req, res) => {
  const { body } = req;

  try {
    const monster = await createMonstersInRepository(body);
    console.log(monster);
    res.status(200).send(monster);
  } catch (e) {
    res
      .status(500)
      .send(`${e.message}: failed to make monster, missing parameters`);
  }
};
