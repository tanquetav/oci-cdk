import { App } from "cdktf";
import MyStack from "./stack";

const app = new App();

new MyStack(app, "oci-cdk", 5);
app.synth();

