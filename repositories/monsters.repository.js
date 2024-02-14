import Monster from "../models/monsters.model.js";

export const getMonstersFromRepository = async (query) => {
  try {
    const monsters = await Monster.find(query);
    return monsters;
  } catch (e) {
    throw Error("Error while fetching monsters");
  }
};

export const updateMonstersInRepository = async (query, update) => {
  try {
    const monster = await Monster.findOneAndUpdate(
      { ...query },
      { ...update },
      { new: true }
    ).lean();
    return monster;
  } catch (e) {
    throw Error("Error while updating monster");
  }
};

export const deleteMonsterFromRepository = async (query) => {
  try {
    const monster = await Monster.findOneAndDelete({ ...query });
    return monster;
  } catch (e) {
    throw Error("Error while deleting a monster");
  }
};

// Tried cheesing it and putting up a countDocument() in db and returning a count + 1 feature
// But it did not work as expected as count could go down & not be unique.
// This gets auto increments +1, based on the id of last object in monster collection
// Note: If the last object is deleted, i.e. id 10, then the last object id becomes 9
//       and resets to 10 for next POST, rather than 11, not sure if this matters to much
export const incrementID = async () => {
  const monsters = await Monster.find({});
  const lastMonster = monsters[monsters.length - 1];
  const lastID = lastMonster.id;
  // console.log(`${lastID + 1}`);
  return lastID + 1;
};
// incrementID(); // Test for correct ID

export const imageURL = async () => {
  const newID = await incrementID();
  // console.log(`https://robohash.org/${newID}?set=set2&size=15x15"`);
  return `https://robohash.org/${newID}?set=set2&size=15x15"`;
};
// imageURL(); // Test for correct URL

export const createMonstersInRepository = async (payload) => {
  try {
    const newID = await incrementID();
    const newURL = await imageURL();
    const newMonster = new Monster({
      id: newID, // set id as auto increment as last indexed
      image_url: newURL, // set image_url as given image_url with newID
      ...payload,
    });
    const savedMonster = await newMonster.save();
    return savedMonster;
  } catch (e) {
    throw Error("Error while creating a monster");
  }
};
