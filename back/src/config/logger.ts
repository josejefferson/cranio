import { config } from '@josejefferson/jj-logger'
import Log from '../models/Log'
import './database'
config.setMongooseModel(Log)
