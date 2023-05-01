import CircularJSON from "circular-json";

const Form = () => {
  return <div>form</div>;
};

export async function getServerSideProps({ req }) {
  const serializedReq = CircularJSON.stringify(req);
  return {
    props: {
      req: serializedReq,
    },
  };
}

export default Form;
