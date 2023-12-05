import { TAdmin } from "./admin.interface";
import Admin from "./admin.model";

const getAllAdminsFromDb = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDb = async (id: string) => {
  const result = await Admin.findOne({ id });
  return result;
};

const updateAdminIntoDb = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

export const AdminServices = {
  getAllAdminsFromDb,
  getSingleAdminFromDb,
  updateAdminIntoDb,
};
