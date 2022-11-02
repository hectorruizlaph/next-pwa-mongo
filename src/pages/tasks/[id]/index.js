import Error from 'next/error'
import {useState} from 'react'
import {Button, Confirm, Grid, GridColumn, GridRow} from 'semantic-ui-react'
import {useRouter} from 'next/router'

export default function TaskDetails({task, error}) {
  const {query, push} = useRouter()

  const [confirm, setConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const open = () => setConfirm(true)
  const close = () => setConfirm(false)

  const deleteTask = async () => {
    const {id} = query
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error(error)
    }
  }
  const handleDelete = () => {
    setIsDeleting(true)
    deleteTask()
    close()
    push('/')
  }

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />

  return (
    <Grid centered verticalAlign="middle" columns={1}>
      <GridRow>
        <GridColumn textAlign="middle">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Delete
            </Button>
          </div>
        </GridColumn>
      </GridRow>
      <Confirm
        header="Please confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      ></Confirm>
    </Grid>
  )
  return <div>{JSON.stringify(task)}</div>
}

export async function getServerSideProps({query: {id}}) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`)

  if (res.status === 200) {
    const task = await res.json()
    return {
      props: {
        task,
      },
    }
  }
  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: 'Invalid id',
      },
    },
  }
}
