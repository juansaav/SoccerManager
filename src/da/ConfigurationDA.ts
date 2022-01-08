import { IConfiguration,IConfigurationInputDTO } from "../interfaces/IConfiguration"; 
import { db } from "../da/dbconnection"; 

export class ConfigurationDA { 

    public async GetConfiguration(key: string) { 
        var user = await db.configuration.findUnique({
          where: {
            key: key,
          },
        })
        return user;
    }

    public async CreateConfiguration(newConfig: IConfigurationInputDTO) {
        const user = await db.configuration.create({
          data: newConfig       
        })
    }
 
}