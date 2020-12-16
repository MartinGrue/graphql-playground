import Head from "next/head";
import { initializeApollo } from "../apollo/client";
import {
  useTasksQuery,
  TasksQuery,
  TasksDocument,
} from "../gql/codegen/graphql-frontend";
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';
export default function Home() {
  const result = useTasksQuery();
  const tasks = result.data?.tasks;

  return (
    <div >
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateTaskForm />
      {result.loading ? (
        <p>Loading tasks...</p>
      ) : result.error ? (
        <p>An error occurred.</p>
      ) : tasks && tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <p className="no-tasks-message">You've got no tasks.</p>
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<TasksQuery>({
    query: TasksDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
