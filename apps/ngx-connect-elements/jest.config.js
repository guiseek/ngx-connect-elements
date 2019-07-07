module.exports = {
  name: 'ngx-connect-elements',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngx-connect-elements',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
