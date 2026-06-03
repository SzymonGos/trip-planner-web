/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
};

export type AdminAuthenticationWithPasswordFailure = {
  __typename?: 'AdminAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type AdminAuthenticationWithPasswordResult = AdminAuthenticationWithPasswordFailure | AdminAuthenticationWithPasswordSuccess;

export type AdminAuthenticationWithPasswordSuccess = {
  __typename?: 'AdminAuthenticationWithPasswordSuccess';
  item: Admin;
  sessionToken: Scalars['String']['output'];
};

export type AdminCreateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type AdminOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type AdminUpdateArgs = {
  data: AdminUpdateInput;
  where: AdminWhereUniqueInput;
};

export type AdminUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type AdminWhereInput = {
  AND?: InputMaybe<Array<AdminWhereInput>>;
  NOT?: InputMaybe<Array<AdminWhereInput>>;
  OR?: InputMaybe<Array<AdminWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type AdminWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AuthenticatedItem = Admin;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

/**
 * Mirrors the formatting options [Cloudinary provides](https://cloudinary.com/documentation/image_transformation_reference).
 * All options are strings as they ultimately end up in a URL.
 */
export type CloudinaryImageFormat = {
  angle?: InputMaybe<Scalars['String']['input']>;
  aspect_ratio?: InputMaybe<Scalars['String']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  border?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  color_space?: InputMaybe<Scalars['String']['input']>;
  crop?: InputMaybe<Scalars['String']['input']>;
  default_image?: InputMaybe<Scalars['String']['input']>;
  delay?: InputMaybe<Scalars['String']['input']>;
  density?: InputMaybe<Scalars['String']['input']>;
  dpr?: InputMaybe<Scalars['String']['input']>;
  effect?: InputMaybe<Scalars['String']['input']>;
  fetch_format?: InputMaybe<Scalars['String']['input']>;
  flags?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  gravity?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['String']['input']>;
  opacity?: InputMaybe<Scalars['String']['input']>;
  overlay?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  /**  Rewrites the filename to be this pretty string. Do not include `/` or `.` */
  prettyName?: InputMaybe<Scalars['String']['input']>;
  quality?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['String']['input']>;
  transformation?: InputMaybe<Scalars['String']['input']>;
  underlay?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  y?: InputMaybe<Scalars['String']['input']>;
  zoom?: InputMaybe<Scalars['String']['input']>;
};

export type CloudinaryImage_File = {
  __typename?: 'CloudinaryImage_File';
  encoding?: Maybe<Scalars['String']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mimetype?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  publicUrl?: Maybe<Scalars['String']['output']>;
  publicUrlTransformed?: Maybe<Scalars['String']['output']>;
};


export type CloudinaryImage_FilePublicUrlTransformedArgs = {
  transformation?: InputMaybe<CloudinaryImageFormat>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiGraphQl = {
  __typename?: 'KeystoneAdminUIGraphQL';
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename?: 'KeystoneAdminUIGraphQLNames';
  createInputName: Scalars['String']['output'];
  createManyMutationName: Scalars['String']['output'];
  createMutationName: Scalars['String']['output'];
  deleteManyMutationName: Scalars['String']['output'];
  deleteMutationName: Scalars['String']['output'];
  itemQueryName: Scalars['String']['output'];
  listOrderName: Scalars['String']['output'];
  listQueryCountName: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  outputTypeName: Scalars['String']['output'];
  relateToManyForCreateInputName: Scalars['String']['output'];
  relateToManyForUpdateInputName: Scalars['String']['output'];
  relateToOneForCreateInputName: Scalars['String']['output'];
  relateToOneForUpdateInputName: Scalars['String']['output'];
  updateInputName: Scalars['String']['output'];
  updateManyInputName: Scalars['String']['output'];
  updateManyMutationName: Scalars['String']['output'];
  updateMutationName: Scalars['String']['output'];
  whereInputName: Scalars['String']['output'];
  whereUniqueInputName: Scalars['String']['output'];
};

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateAdminWithPassword?: Maybe<AdminAuthenticationWithPasswordResult>;
  createAdmin?: Maybe<Admin>;
  createAdmins?: Maybe<Array<Maybe<Admin>>>;
  createTrip?: Maybe<Trip>;
  createTripImage?: Maybe<TripImage>;
  createTripImages?: Maybe<Array<Maybe<TripImage>>>;
  createTrips?: Maybe<Array<Maybe<Trip>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteAdmin?: Maybe<Admin>;
  deleteAdmins?: Maybe<Array<Maybe<Admin>>>;
  deleteTrip?: Maybe<Trip>;
  deleteTripImage?: Maybe<TripImage>;
  deleteTripImages?: Maybe<Array<Maybe<TripImage>>>;
  deleteTrips?: Maybe<Array<Maybe<Trip>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  updateAdmin?: Maybe<Admin>;
  updateAdmins?: Maybe<Array<Maybe<Admin>>>;
  updateTrip?: Maybe<Trip>;
  updateTripImage?: Maybe<TripImage>;
  updateTripImages?: Maybe<Array<Maybe<TripImage>>>;
  updateTrips?: Maybe<Array<Maybe<Trip>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateAdminWithPasswordArgs = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateAdminArgs = {
  data: AdminCreateInput;
};


export type MutationCreateAdminsArgs = {
  data: Array<AdminCreateInput>;
};


export type MutationCreateTripArgs = {
  data: TripCreateInput;
};


export type MutationCreateTripImageArgs = {
  data: TripImageCreateInput;
};


export type MutationCreateTripImagesArgs = {
  data: Array<TripImageCreateInput>;
};


export type MutationCreateTripsArgs = {
  data: Array<TripCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteAdminArgs = {
  where: AdminWhereUniqueInput;
};


export type MutationDeleteAdminsArgs = {
  where: Array<AdminWhereUniqueInput>;
};


export type MutationDeleteTripArgs = {
  where: TripWhereUniqueInput;
};


export type MutationDeleteTripImageArgs = {
  where: TripImageWhereUniqueInput;
};


export type MutationDeleteTripImagesArgs = {
  where: Array<TripImageWhereUniqueInput>;
};


export type MutationDeleteTripsArgs = {
  where: Array<TripWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationUpdateAdminArgs = {
  data: AdminUpdateInput;
  where: AdminWhereUniqueInput;
};


export type MutationUpdateAdminsArgs = {
  data: Array<AdminUpdateArgs>;
};


export type MutationUpdateTripArgs = {
  data: TripUpdateInput;
  where: TripWhereUniqueInput;
};


export type MutationUpdateTripImageArgs = {
  data: TripImageUpdateInput;
  where: TripImageWhereUniqueInput;
};


export type MutationUpdateTripImagesArgs = {
  data: Array<TripImageUpdateArgs>;
};


export type MutationUpdateTripsArgs = {
  data: Array<TripUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  admin?: Maybe<Admin>;
  admins?: Maybe<Array<Admin>>;
  adminsCount?: Maybe<Scalars['Int']['output']>;
  authenticatedItem?: Maybe<AuthenticatedItem>;
  keystone: KeystoneMeta;
  trip?: Maybe<Trip>;
  tripImage?: Maybe<TripImage>;
  tripImages?: Maybe<Array<TripImage>>;
  tripImagesCount?: Maybe<Scalars['Int']['output']>;
  trips?: Maybe<Array<Trip>>;
  tripsCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryAdminArgs = {
  where: AdminWhereUniqueInput;
};


export type QueryAdminsArgs = {
  cursor?: InputMaybe<AdminWhereUniqueInput>;
  orderBy?: Array<AdminOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AdminWhereInput;
};


export type QueryAdminsCountArgs = {
  where?: AdminWhereInput;
};


export type QueryTripArgs = {
  where: TripWhereUniqueInput;
};


export type QueryTripImageArgs = {
  where: TripImageWhereUniqueInput;
};


export type QueryTripImagesArgs = {
  cursor?: InputMaybe<TripImageWhereUniqueInput>;
  orderBy?: Array<TripImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TripImageWhereInput;
};


export type QueryTripImagesCountArgs = {
  where?: TripImageWhereInput;
};


export type QueryTripsArgs = {
  cursor?: InputMaybe<TripWhereUniqueInput>;
  orderBy?: Array<TripOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TripWhereInput;
};


export type QueryTripsCountArgs = {
  where?: TripWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Trip = {
  __typename?: 'Trip';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['String']['output']>;
  estimatedDuration?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  status?: Maybe<TripStatusType>;
  title?: Maybe<Scalars['String']['output']>;
  tripImages?: Maybe<Array<TripImage>>;
  tripImagesCount?: Maybe<Scalars['Int']['output']>;
};


export type TripTripImagesArgs = {
  cursor?: InputMaybe<TripImageWhereUniqueInput>;
  orderBy?: Array<TripImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TripImageWhereInput;
};


export type TripTripImagesCountArgs = {
  where?: TripImageWhereInput;
};

export type TripCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  creator?: InputMaybe<UserRelateToOneForCreateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  destination?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['String']['input']>;
  estimatedDuration?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TripStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
  tripImages?: InputMaybe<TripImageRelateToManyForCreateInput>;
};

export type TripImage = {
  __typename?: 'TripImage';
  id: Scalars['ID']['output'];
  image?: Maybe<CloudinaryImage_File>;
  trip?: Maybe<Trip>;
};

export type TripImageCreateInput = {
  image?: InputMaybe<Scalars['Upload']['input']>;
  trip?: InputMaybe<TripRelateToOneForCreateInput>;
};

export type TripImageManyRelationFilter = {
  every?: InputMaybe<TripImageWhereInput>;
  none?: InputMaybe<TripImageWhereInput>;
  some?: InputMaybe<TripImageWhereInput>;
};

export type TripImageOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type TripImageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TripImageWhereUniqueInput>>;
  create?: InputMaybe<Array<TripImageCreateInput>>;
};

export type TripImageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TripImageWhereUniqueInput>>;
  create?: InputMaybe<Array<TripImageCreateInput>>;
  disconnect?: InputMaybe<Array<TripImageWhereUniqueInput>>;
  set?: InputMaybe<Array<TripImageWhereUniqueInput>>;
};

export type TripImageUpdateArgs = {
  data: TripImageUpdateInput;
  where: TripImageWhereUniqueInput;
};

export type TripImageUpdateInput = {
  image?: InputMaybe<Scalars['Upload']['input']>;
  trip?: InputMaybe<TripRelateToOneForUpdateInput>;
};

export type TripImageWhereInput = {
  AND?: InputMaybe<Array<TripImageWhereInput>>;
  NOT?: InputMaybe<Array<TripImageWhereInput>>;
  OR?: InputMaybe<Array<TripImageWhereInput>>;
  id?: InputMaybe<IdFilter>;
  trip?: InputMaybe<TripWhereInput>;
};

export type TripImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TripOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  destination?: InputMaybe<OrderDirection>;
  distance?: InputMaybe<OrderDirection>;
  estimatedDuration?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  origin?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type TripRelateToOneForCreateInput = {
  connect?: InputMaybe<TripWhereUniqueInput>;
  create?: InputMaybe<TripCreateInput>;
};

export type TripRelateToOneForUpdateInput = {
  connect?: InputMaybe<TripWhereUniqueInput>;
  create?: InputMaybe<TripCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum TripStatusType {
  Completed = 'completed',
  Planning = 'planning'
}

export type TripStatusTypeNullableFilter = {
  equals?: InputMaybe<TripStatusType>;
  in?: InputMaybe<Array<TripStatusType>>;
  not?: InputMaybe<TripStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<TripStatusType>>;
};

export type TripUpdateArgs = {
  data: TripUpdateInput;
  where: TripWhereUniqueInput;
};

export type TripUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  creator?: InputMaybe<UserRelateToOneForUpdateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  destination?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['String']['input']>;
  estimatedDuration?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TripStatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
  tripImages?: InputMaybe<TripImageRelateToManyForUpdateInput>;
};

export type TripWhereInput = {
  AND?: InputMaybe<Array<TripWhereInput>>;
  NOT?: InputMaybe<Array<TripWhereInput>>;
  OR?: InputMaybe<Array<TripWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  creator?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<StringFilter>;
  destination?: InputMaybe<StringFilter>;
  distance?: InputMaybe<StringFilter>;
  estimatedDuration?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  origin?: InputMaybe<StringFilter>;
  status?: InputMaybe<TripStatusTypeNullableFilter>;
  title?: InputMaybe<StringFilter>;
  tripImages?: InputMaybe<TripImageManyRelationFilter>;
};

export type TripWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  aiChatUsageCount?: Maybe<Scalars['Int']['output']>;
  aiChatUsageResetDate?: Maybe<Scalars['DateTime']['output']>;
  clerkId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  googleMapsRouteCount?: Maybe<Scalars['Int']['output']>;
  googleMapsRouteResetDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  profileImage?: Maybe<CloudinaryImage_File>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserCreateInput = {
  aiChatUsageCount?: InputMaybe<Scalars['Int']['input']>;
  aiChatUsageResetDate?: InputMaybe<Scalars['DateTime']['input']>;
  clerkId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  googleMapsRouteCount?: InputMaybe<Scalars['Int']['input']>;
  googleMapsRouteResetDate?: InputMaybe<Scalars['DateTime']['input']>;
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  profileImage?: InputMaybe<Scalars['Upload']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserOrderByInput = {
  aiChatUsageCount?: InputMaybe<OrderDirection>;
  aiChatUsageResetDate?: InputMaybe<OrderDirection>;
  clerkId?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  deletedAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  googleMapsRouteCount?: InputMaybe<OrderDirection>;
  googleMapsRouteResetDate?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isDeleted?: InputMaybe<OrderDirection>;
  username?: InputMaybe<OrderDirection>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  aiChatUsageCount?: InputMaybe<Scalars['Int']['input']>;
  aiChatUsageResetDate?: InputMaybe<Scalars['DateTime']['input']>;
  clerkId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  googleMapsRouteCount?: InputMaybe<Scalars['Int']['input']>;
  googleMapsRouteResetDate?: InputMaybe<Scalars['DateTime']['input']>;
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  profileImage?: InputMaybe<Scalars['Upload']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  aiChatUsageCount?: InputMaybe<IntNullableFilter>;
  aiChatUsageResetDate?: InputMaybe<DateTimeNullableFilter>;
  clerkId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  googleMapsRouteCount?: InputMaybe<IntNullableFilter>;
  googleMapsRouteResetDate?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isDeleted?: InputMaybe<BooleanFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  clerkId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};
