import { userSettingsSchema } from '../helpers/formValidation';

const validUser = {
  username: 'johndoe',
  email: 'john@example.com',
};

describe('User Form Validation', () => {
  test('validates all required fields', () => {
    expect(userSettingsSchema.safeParse(validUser).success).toBe(true);
  });

  test.each([['username'], ['email']])('shows an error when %s is missing', (field) => {
    const invalidData: Record<string, unknown> = { ...validUser };
    delete invalidData[field];
    const result = userSettingsSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(expect.arrayContaining([expect.objectContaining({ path: [field] })]));
    }
  });

  test.each([
    ['', 'Username must be at least 5 characters long'],
    ['john', 'Username must be at least 5 characters long'],
    ['a'.repeat(16), 'Username is too long'],
  ])('rejects invalid username %p', (username, message) => {
    const result = userSettingsSchema.safeParse({ ...validUser, username });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(message);
    }
  });

  test.each([['user1'], ['a'.repeat(15)]])('validates username boundary value %p', (username) => {
    expect(userSettingsSchema.safeParse({ ...validUser, username }).success).toBe(true);
  });

  test.each([['user_123'], ['user12345'], ['JohnDoe']])('validates supported username %p', (username) => {
    expect(userSettingsSchema.safeParse({ ...validUser, username }).success).toBe(true);
  });

  test.each([
    ['user@example.com'],
    ['test.email@domain.co.uk'],
    ['user+tag@example.org'],
    ['user123@test-domain.com'],
    ['user@mail.example.com'],
  ])('validates email format %p', (email) => {
    expect(userSettingsSchema.safeParse({ ...validUser, email }).success).toBe(true);
  });

  test.each([[''], ['not-an-email'], ['@example.com'], ['user@'], ['user@.com'], ['user@example']])(
    'rejects invalid email format %p',
    (email) => {
      const result = userSettingsSchema.safeParse({ ...validUser, email });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    },
  );

  test.each([[undefined], [new File([''], 'profile.jpg')]])(
    'validates an omitted or valid profile image',
    (profileImage) => {
      expect(userSettingsSchema.safeParse({ ...validUser, profileImage }).success).toBe(true);
    },
  );

  test.each([['not-a-file'], [null]])('rejects invalid profile image %p', (profileImage) => {
    expect(userSettingsSchema.safeParse({ ...validUser, profileImage }).success).toBe(false);
  });

  test('validates complete form with all fields', () => {
    const result = userSettingsSchema.safeParse({
      username: 'johndoe123',
      email: 'john.doe@example.com',
      profileImage: new File([''], 'profile-pic.jpg'),
    });

    expect(result.success).toBe(true);
  });

  test('shows multiple errors when multiple fields are invalid', () => {
    const result = userSettingsSchema.safeParse({
      username: 'jo',
      email: 'invalid-email',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(2);
      expect(result.error.issues[0].message).toBe('Username must be at least 5 characters long');
      expect(result.error.issues[1].message).toBe('Invalid email address');
    }
  });
});
