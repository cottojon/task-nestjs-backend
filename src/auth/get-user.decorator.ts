import { createParamDecorator } from "@nestjs/common";
import { User } from './user.entity';

// data = data provided to the decorator
// req = the request object 
// ignore data for now since we are not going to call this decorator with any data
export const GetUser = createParamDecorator((data, req): User => {
    // whatever we return from this function is going to be set to the parameter that is decorated
    return req.user;
});