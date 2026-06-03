import { KeystoneContext } from '@keystone-6/core/types';

export async function insertSeedData(keystone: KeystoneContext) {
  try {
    // Create default admin user using Keystone context (password will be hashed)
    const admin = await keystone.query.Admin.createOne({
      data: adminCreateInput,
    });

    console.log('✅ Admin user created:', admin);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

export const adminCreateInput = {
  name: 'admin',
  password: 'admin123', // Change this to your preferred password
};
