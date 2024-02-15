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

/* Tried cheesing it and putting up a countDocument() in db and returning a
   count+1, but it did not work as expected as count could go down & no longer
   be unique.

   Note: If the last object is deleted, i.e. id 10, then the last object id
         becomes 9 and resets to 10 for next POST, rather than 11, not sure if
         this matters to much.
*/
export const incrementID = async () => {
  const monsters = await Monster.find({}); // Get list of all monsters
  const lastMonster = monsters[monsters.length - 1];
  const lastID = lastMonster.id;
  // console.log(`${lastID + 1}`);
  return lastID + 1; // Increment by 1
};
// incrementID();

export const imageURL = async () => {
  const newID = await incrementID();
  // console.log(`https://robohash.org/${newID}?set=set2&size=15x15"`);
  return `https://robohash.org/${newID}?set=set2&size=15x15"`;
};
// imageURL();

export const createMonstersInRepository = async (payload) => {
  try {
    const newID = await incrementID(); // incremented id
    const newURL = await imageURL(); // image_url with incremented id
    const newMonster = new Monster({
      id: newID,
      image_url: newURL,
      ...payload,
    });
    const savedMonster = await newMonster.save();
    return savedMonster;
  } catch (e) {
    throw Error("Error while creating a monster");
  }
};
