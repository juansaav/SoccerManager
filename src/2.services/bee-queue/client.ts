import Queue from "bee-queue";
import config from "../../config";

const queue = new Queue("welcome-email", {
  redis: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  },
});

function sendWelcomeEmail(email: string) {
  console.log(`Bee-queue client: sending welcome email to ${email}`);
  const job = queue.createJob({ email });
  job.save();
  job.on("succeeded", (result) => {
    console.log(
      `Bee-queue client: received result for job ${job.id}: ${result}`
    );
  });
}

export default sendWelcomeEmail;
