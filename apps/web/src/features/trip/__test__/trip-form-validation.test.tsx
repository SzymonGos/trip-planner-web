import { tripSchema } from '../helpers/formValidation';

describe('Trip Form Validation', () => {
  test('validates required fields', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('shows error when title is too short', () => {
    const invalidData = {
      title: 'Hi',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title must be at least 5 characters long');
    }
  });

  test('shows error when title is too long', () => {
    const invalidData = {
      title: 'A'.repeat(101),
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title is to long');
    }
  });

  test('shows error when title is empty', () => {
    const invalidData = {
      title: '',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title must be at least 5 characters long');
    }
  });

  test('validates title with exactly 5 characters', () => {
    const validData = {
      title: 'Trip1',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates title with exactly 100 characters', () => {
    const validData = {
      title: 'A'.repeat(100),
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('shows error when origin is missing', () => {
    const invalidData = {
      title: 'My Trip',
      destination: 'Los Angeles',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Required');
    }
  });

  test('shows error when origin is empty string', () => {
    const invalidData = {
      title: 'My Trip',
      origin: '',
      destination: 'Los Angeles',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Origin is required');
    }
  });

  test('shows error when destination is missing', () => {
    const invalidData = {
      title: 'My Trip',
      origin: 'New York',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Required');
    }
  });

  test('shows error when destination is empty string', () => {
    const invalidData = {
      title: 'My Trip',
      origin: 'New York',
      destination: '',
      status: 'planning' as const,
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Destination is required');
    }
  });

  test('validates optional description', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      description: 'A great trip',
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates when description is undefined', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      description: undefined,
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('shows error when description is too long', () => {
    const invalidData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      description: 'A'.repeat(351),
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Description is to long');
    }
  });

  test('validates description with exactly 350 characters', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      description: 'A'.repeat(350),
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates empty description', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      description: '',
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates images array when empty', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      images: [],
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates images array when undefined', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      images: undefined,
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('shows error when too many images are uploaded', () => {
    const invalidData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      images: Array(6).fill(new File([''], 'test.jpg')),
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Maximum 5 images allowed');
    }
  });

  test('validates maximum allowed images (5)', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      images: Array(5).fill(new File([''], 'test.jpg')),
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates File objects in images array', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      images: [new File([''], 'test.jpg')],
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates existing image objects in images array', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      images: [
        {
          id: 'image-123',
          image: {
            id: 'file-123',
            filename: 'test.jpg',
          },
        },
      ],
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('shows error for invalid image object structure', () => {
    const invalidData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      images: [
        {
          id: 'image-123',
          image: {
            id: 'file-123',
            // missing filename
          },
        },
      ],
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test('shows error for invalid image object type', () => {
    const invalidData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      images: ['invalid-image-type'],
    };

    const result = tripSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test('validates mixed File and existing image objects', () => {
    const validData = {
      title: 'My Trip',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'planning' as const,
      images: [
        new File([''], 'new-image.jpg'),
        {
          id: 'existing-image-123',
          image: {
            id: 'file-123',
            filename: 'existing.jpg',
          },
        },
      ],
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('validates complete form with all optional fields', () => {
    const validData = {
      title: 'Amazing Road Trip',
      description: 'A wonderful journey across the country',
      origin: 'San Francisco, CA',
      destination: 'New York, NY',
      status: 'completed' as const,
      images: [new File([''], 'photo1.jpg'), new File([''], 'photo2.jpg')],
    };

    const result = tripSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
