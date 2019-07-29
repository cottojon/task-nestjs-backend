export class CreateTaskDTO {
    //when creating a DTO we need to think about the first point where we receive our data
    //that would be the handler in the controller (http post request body)
    //we need a title and description

    title: string;
    description: string;
}