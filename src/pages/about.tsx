export async function getServerSideProps() {
    // This function runs on the server side
    const serverTime = new Date().toString();
  
    // Return the props
    return {
      props: {
        serverTime
      }
    };
  }

const SSRExample = ({ serverTime }: { serverTime: string }) => {
    return (
      <div>
        <h1>Server-Side Rendering Example</h1>
        <p>Server time: {serverTime}</p>
      </div>
    );
  };

  export default SSRExample;
  