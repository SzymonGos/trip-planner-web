import { tripSchema } from '../helpers/formValidation';

const validTrip = {
  title: 'My Trip',
  origin: 'New York',
  destination: 'Los Angeles',
  distanceMeters: 0,
  estimatedDurationSeconds: 0,
  status: 'PLANNING' as const,
};

describe('Trip Form Validation', () => {
  test('validates all required fields', () => {
    expect(tripSchema.safeParse(validTrip).success).toBe(true);
  });

  test.each([['title'], ['origin'], ['destination'], ['distanceMeters'], ['estimatedDurationSeconds'], ['status']])(
    'shows an error when %s is missing',
    (field) => {
      const invalidData: Record<string, unknown> = { ...validTrip };
      delete invalidData[field];
      const result = tripSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toEqual(expect.arrayContaining([expect.objectContaining({ path: [field] })]));
      }
    },
  );

  test('shows error when title is too short', () => {
    const result = tripSchema.safeParse({ ...validTrip, title: 'Trip' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title must be at least 5 characters long');
    }
  });

  test('shows error when title is too long', () => {
    const result = tripSchema.safeParse({ ...validTrip, title: 'A'.repeat(101) });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title is to long');
    }
  });

  test.each(['Trip1', 'A'.repeat(100)])('validates title boundary value', (title) => {
    expect(tripSchema.safeParse({ ...validTrip, title }).success).toBe(true);
  });

  test.each([
    ['origin', 'Origin is required'],
    ['destination', 'Destination is required'],
  ])('shows an error when %s is empty', (field, message) => {
    const result = tripSchema.safeParse({ ...validTrip, [field]: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(message);
    }
  });

  test.each([undefined, '', 'A'.repeat(350)])(
    'validates an omitted, empty, or maximum-length description',
    (description) => {
      expect(tripSchema.safeParse({ ...validTrip, description }).success).toBe(true);
    },
  );

  test('shows error when description is too long', () => {
    const result = tripSchema.safeParse({ ...validTrip, description: 'A'.repeat(351) });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Description is to long');
    }
  });

  test.each(['PLANNING', 'COMPLETED'] as const)('validates %s status', (status) => {
    expect(tripSchema.safeParse({ ...validTrip, status }).success).toBe(true);
  });

  test('rejects an unsupported status', () => {
    expect(tripSchema.safeParse({ ...validTrip, status: 'IN_PROGRESS' }).success).toBe(false);
  });

  test.each(['distanceMeters', 'estimatedDurationSeconds'])('validates %s at zero', (field) => {
    expect(tripSchema.safeParse({ ...validTrip, [field]: 0 }).success).toBe(true);
  });

  test.each(['distanceMeters', 'estimatedDurationSeconds'])('rejects negative %s', (field) => {
    expect(tripSchema.safeParse({ ...validTrip, [field]: -1 }).success).toBe(false);
  });

  test.each(['distanceMeters', 'estimatedDurationSeconds'])('rejects non-integer %s', (field) => {
    expect(tripSchema.safeParse({ ...validTrip, [field]: 1.5 }).success).toBe(false);
  });

  test.each([[undefined], [[]]])('validates images when omitted or empty', (images) => {
    expect(tripSchema.safeParse({ ...validTrip, images }).success).toBe(true);
  });

  test('validates the maximum of 5 uploaded images', () => {
    const images = Array.from({ length: 5 }, (_, index) => new File([''], `test-${index}.jpg`));

    expect(tripSchema.safeParse({ ...validTrip, images }).success).toBe(true);
  });

  test('shows error when more than 5 images are uploaded', () => {
    const images = Array.from({ length: 6 }, (_, index) => new File([''], `test-${index}.jpg`));
    const result = tripSchema.safeParse({ ...validTrip, images });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Maximum 5 images allowed');
    }
  });

  test('rejects non-File values in the images array', () => {
    expect(tripSchema.safeParse({ ...validTrip, images: ['invalid-image-type'] }).success).toBe(false);
  });

  test('validates complete form with all optional fields', () => {
    const result = tripSchema.safeParse({
      ...validTrip,
      title: 'Amazing Road Trip',
      description: 'A wonderful journey across the country',
      distanceMeters: 4_667_000,
      estimatedDurationSeconds: 154_800,
      status: 'COMPLETED',
      images: [new File([''], 'photo1.jpg'), new File([''], 'photo2.jpg')],
    });

    expect(result.success).toBe(true);
  });
});
