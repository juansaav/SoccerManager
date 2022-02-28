import Queue from "bee-queue";
import config from "../../config";

function startWorker() {
  const queue = new Queue("welcome-email", {
    redis: {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    },
  });

  // Process jobs from as many servers or processes as you like
  queue.process(async (job) => {
    console.log(
      `Bee-queue worker: processing job ${job.id} data: ${job.data.email}`
    );
    // TODO: send welcome email
    return "Welcome email sent to " + job.data.email;
  });
}

export default startWorker;
