import { userSettingsSchema } from '../helpers/formValidation';

describe('User Form Validation', () => {
  test('validates required fields', () => {
    const validData = {
      username: 'johndoe',
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('shows error when username is too short', () => {
    const invalidData = {
      username: 'john',
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Username must be at least 5 characters long');
    }
  });

  test('shows error when username is too long', () => {
    const invalidData = {
      username: 'a'.repeat(16),
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Username is too long');
    }
  });

  test('shows error when username is empty', () => {
    const invalidData = {
      username: '',
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Username must be at least 5 characters long');
    }
  });

  test('validates username with exactly 5 characters', () => {
    const validData = {
      username: 'user1',
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates username with exactly 15 characters', () => {
    const validData = {
      username: 'a'.repeat(15),
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('shows error when username is missing', () => {
    const invalidData = {
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Required');
    }
  });

  test('shows error when email is invalid', () => {
    const invalidData = {
      username: 'johndoe',
      email: 'invalid-email',
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address');
    }
  });

  test('shows error when email is missing', () => {
    const invalidData = {
      username: 'johndoe',
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Required');
    }
  });

  test('shows error when email is empty', () => {
    const invalidData = {
      username: 'johndoe',
      email: '',
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address');
    }
  });

  test('validates various email formats', () => {
    const validEmails = [
      'user@example.com',
      'test.email@domain.co.uk',
      'user+tag@example.org',
      'user123@test-domain.com',
    ];

    validEmails.forEach((email) => {
      const validData = {
        username: 'johndoe',
        email: email,
      };

      const result = userSettingsSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  test('shows error for invalid email formats', () => {
    const invalidEmails = [
      'not-an-email',
      '@example.com',
      'user@',
      'user@.com',
      'user..name@example.com',
      'user@example',
    ];

    invalidEmails.forEach((email) => {
      const invalidData = {
        username: 'johndoe',
        email: email,
      };

      const result = userSettingsSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });
  });

  test('validates optional profile image when provided', () => {
    const validData = {
      username: 'johndoe',
      email: 'john@example.com',
      profileImage: new File([''], 'profile.jpg'),
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates when profile image is undefined', () => {
    const validData = {
      username: 'johndoe',
      email: 'john@example.com',
      profileImage: undefined,
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('shows error when profile image is not a File object', () => {
    const invalidData = {
      username: 'johndoe',
      email: 'john@example.com',
      profileImage: 'not-a-file',
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test('shows error when profile image is null', () => {
    const invalidData = {
      username: 'johndoe',
      email: 'john@example.com',
      profileImage: null,
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test('validates complete form with all fields', () => {
    const validData = {
      username: 'johndoe123',
      email: 'john.doe@example.com',
      profileImage: new File([''], 'profile-pic.jpg'),
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates form with only required fields', () => {
    const validData = {
      username: 'johndoe',
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('shows multiple errors when multiple fields are invalid', () => {
    const invalidData = {
      username: 'jo',
      email: 'invalid-email',
    };

    const result = userSettingsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(2);
      expect(result.error.issues[0].message).toBe('Username must be at least 5 characters long');
      expect(result.error.issues[1].message).toBe('Invalid email address');
    }
  });

  test('validates username with special characters', () => {
    const validData = {
      username: 'user_123',
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates username with numbers', () => {
    const validData = {
      username: 'user12345',
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates username with mixed case', () => {
    const validData = {
      username: 'JohnDoe',
      email: 'john@example.com',
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates email with subdomain', () => {
    const validData = {
      username: 'johndoe',
      email: 'user@mail.example.com',
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates email with country code', () => {
    const validData = {
      username: 'johndoe',
      email: 'user@example.co.uk',
    };

    const result = userSettingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
