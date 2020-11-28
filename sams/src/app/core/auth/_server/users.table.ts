export class UsersTable {
  public static users: any = [
    {
      id: 1,
      username: 'admin',
      password: 'demo',
      email: 'admin@demo.com',
      accessToken: 'access-token-8f3ae836da744329a6f93bf20594b5cc',
      refreshToken: 'access-token-f8c137a2c98743f48b643e71161d90aa',
      roles: [1], // Administrator
      pic: './assets/media/users/300_25.jpg',
      fullname: 'Naveen',
      occupation: 'CEO',
      companyName: 'Pixehub',
      phone: '456669067890',
      address: {
        addressLine: '',
        city: '',
        state: '',
        postCode: ''
      },
      socialNetworks: {
      }
    },
 
  ];

  public static tokens: any = [
    {
      id: 1,
      accessToken: 'access-token-' + Math.random(),
      refreshToken: 'access-token-' + Math.random()
    }
  ];
}
