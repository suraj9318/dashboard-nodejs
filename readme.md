# cors error from browser
install cors package : npm i cors
const app = express();
app.use(cors())

# read post request from api
app.use(express.json())