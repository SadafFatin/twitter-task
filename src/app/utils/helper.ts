export const errorMsgs = {
  email:

  {
    type: 'pattern',
    message: 'Provide valid email address with @.',
  },

  username:
  {
    type: 'pattern',
    message: 'Minimum 4 characters, can contain special character',
  },
  password:
  {
    type: 'pattern',
    message: 'Minimum 8 characters, at least one letter, one number and one special character',
  },
  confirmpassword:
  {
    type: 'pattern',
    message: 'Passwords don\'t match',
  },
  content:
  {
    type: 'pattern',
    message: 'Provide a valid tweet',
  },
  inf_id: [
    {
      type: 'required',
      message: 'INF is required.',
    },
    {
      type: 'pattern',
      message: 'Please provide a valid INF id',
    },
  ],

  block_id: [
    {
      type: 'pattern',
      message: 'Please provide a valid number id',
    },
  ],
  sub_block_id: [
    {
      type: 'pattern',
      message: 'Please provide a valid number id',
    },
  ],
  majhi_id: [
    {
      type: 'pattern',
      message: 'Please provide a valid number id',
    },
  ],
  hh_no: [
    {
      type: 'required',
      message: 'House Hold number is required.',
    },
    {
      type: 'pattern',
      message: 'Please provide a valid number id',
    },
  ],
  name: [
    {
      type: 'required',
      message: 'Name is required.',
    },
    {
      type: 'pattern',
      message: 'Please provide a valid name',
    },
  ],
  woman_id: [
    {
      type: 'pattern',
      message: 'Please provide a valid name',
    },
  ],
  caregiver: [
    {
      type: 'pattern',
      message: 'Please provide a valid name',
    },
  ],
  father: [
    {
      type: 'pattern',
      message: 'Please provide a valid name',
    },
  ],
  registration_date: [
    {
      type: 'required',
      message: 'Registration Date or Age is required.',
    },
  ],
  date_of_birth: [
    {
      type: 'required',
      message:
        'The date of birth field is required when none of age are present.',
    },
  ],
  age: [
    {
      type: 'required',
      message:
        'The date of birth field is required when none of age are present.',
    },
  ],
  phone: [
    {
      type: 'required',
      message: 'Phone Number is required.',
    },
    {
      type: 'pattern',
      message: '11 Digit and Start with 01',
    },
  ],
  mnr_no: [
    {
      type: 'pattern',
      message: 'Please provide a valid id',
    },
  ],
  fcn: [
    {
      type: 'pattern',
      message: 'Please provide a Family Count Number(FCN)',
    },
  ],
  ancpnc: [
    {
      type: 'pattern',
      message: 'Please provide a Family Count Number(FCN)',
    },
  ],
  moha_id: [
    {
      type: 'pattern',
      message: 'Please provide a valid Moha Id',
    },
  ],
  progress_id: [
    {
      type: 'pattern',
      message: 'Please provide a valid Progress Id',
    },
  ],
  scope_no: [
    {
      type: 'pattern',
      message: 'Please provide a valid Scope Id',
    },
  ]
  ,
  remarks: [
    {
      type: 'required',
      message: 'Remarks is required.',
    },
    {
      type: 'pattern',
      message: 'Please Provide a valid remarks',
    },
  ]
};
//patterns
export const requiredPattern = '[a-zA-Z0-9. /:-]{3,}';
export const datePattern = '[0-9]{4}-[0-9]{2}-[0-9]{2}.*';
export const http = '(http[s]?://[^ ]*)';
export const mobilePattern = '^0[0-9]{10}';
export const emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
export const passPattern = '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

export const usernamePattern = '^((?=[^a-zA-Z0-9]*[a-zA-Z0-9])[a-zA-Z0-9 !@#$%^&*()_~.+,/\" -]+){5,}$';
export const idPattern = '^[a-zA-Z0-9.-]+$';
export const postPattern = '[0-9]{4,}';
export const numberIdPattern = '[0-9]{1,}';
export const numberPattern = '[0-9]{1,}.*[0-9]{0,}';


export const SUCCESS_API_MESSAGE = "successful";
export const MAPKEY_TWEETS = "tweets";

export const MAPKEY_MYTWEETS = "my-tweets";
export const MAPKEY_FOLLOWERS = "followers";
export const MAPKEY_FOLLOWINGS = "following";

export const ARRAYKEY_FOLLOWINGS = "followings";
export const ARRAYKEY_FOLLOWERS = "followers";
export const ARRAYKEY_TWEET = "tweets";
export const ARRAYKEY_MYTWEET = "my_tweets";
