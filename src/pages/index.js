import {useRouter} from 'next/router'
import {
  Button,
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  Container,
  Grid,
  GridColumn,
  GridRow,
} from 'semantic-ui-react'

export default function Home({tasks}) {
  const router = useRouter()

  if (tasks.length === 0) {
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns={1}
        style={{heigth: ' 80vh'}}
      >
        <GridRow>
          <GridColumn textAlign="center">
            <h1>Please create a task</h1>
            <div>
              <Button primary onClick={() => push('tasks/new')}>
                Create a Task
              </Button>
            </div>
          </GridColumn>
        </GridRow>
      </Grid>
    )
  }
  return (
    <Container style={{padding: '5rem'}}>
      <CardGroup itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <CardContent>
              <CardHeader>{task.title}</CardHeader>
            </CardContent>
            <CardContent extra>
              <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>
                View
              </Button>
              <Button
                secondary
                onClick={() => router.push(`/tasks/${task._id}/edit`)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardGroup>
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch('http://localhost:3000/api/tasks')
  const tasks = await res.json()
  console.log(tasks)

  return {
    props: {
      tasks,
    },
  }
}
