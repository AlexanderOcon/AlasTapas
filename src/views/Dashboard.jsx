import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <Card style={{ height: 600 }}>
        <iframe
          title="estadísticas"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/view?r=eyJrIjoiMjNjNmVmODYtYTk2My00ZTZhLTk2YmEtYjI3ZTBiMTlkY2RmIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
          allowFullscreen="true"
        ></iframe>
      </Card>
    </Container>
  );
};
export default Dashboard;