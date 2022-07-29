import jjLoggerConfig from '@josejefferson/jj-logger/config'
import Log from '../models/Log'
import './database'
jjLoggerConfig.setMongooseModel(Log)