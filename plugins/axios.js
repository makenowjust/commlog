export default ({$axios}) => {
  $axios.setToken('28ff173c802e57b8d7d0aaf8fe55dba34d731ca3', 'Bearer');
  $axios.setHeader(
    'Accept',
    'application/vnd.github.cloak-preview, application/vnd.github.v3+json',
  );
};
