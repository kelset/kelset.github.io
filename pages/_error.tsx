import Layout from "../components/layout";

function Error({ statusCode }) {
  return (
    <Layout>
      <h1>...yikes</h1>
      <p>I honestly have no idea how you managed to get a 500, but welp.</p>
      <p>
        Here are the details:{" "}
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
