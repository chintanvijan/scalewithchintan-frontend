const { createClient } = require('redis');

const client = createClient({
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD || 'HFzm9uTTs87Bg8af20PQVmWJl7ggJ6G6',
  socket: {
    host: process.env.REDIS_HOST || 'redis-17065.c264.ap-south-1-1.ec2.cloud.redislabs.com',
    port: parseInt(process.env.REDIS_PORT || '17065', 10),
  },
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connecting...'));
client.on('ready', () => console.log('Redis Client Connected'));

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Successfully connected to Redis');

    // Test set/get
    await client.set('test:connection', 'success');
    const result = await client.get('test:connection');
    console.log('✅ Test get/set:', result);

    // Check if tech_news key exists
    const newsExists = await client.exists('tech_news');
    if (newsExists) {
      console.log('✅ Found "tech_news" key in Redis');
      const newsData = await client.get('tech_news');
      if (newsData) {
        try {
          const parsed = JSON.parse(newsData);
          console.log('✅ News data structure:', {
            status: parsed.status,
            totalResults: parsed.totalResults,
            resultsCount: parsed.results?.length || 0,
          });
        } catch (e) {
          console.log('⚠️  News data exists but is not valid JSON');
        }
      }
    } else {
      console.log('⚠️  "tech_news" key not found in Redis');
    }

    // Clean up test key
    await client.del('test:connection');
    console.log('✅ Test completed successfully');

    await client.quit();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    await client.quit();
    process.exit(1);
  }
}

testConnection();

