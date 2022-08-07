import { Construct } from "constructs";
import { TerraformStack } from "cdktf";

import { IdentityCompartment } from "./.gen/providers/oci/identity-compartment";
import { NetworkAbstractFactory } from "./network_factory";

export default class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string, size: number = 1) {
    super(scope, name);

    // define resources here
    const compartment = new IdentityCompartment(this, "compartment", {
      name: "oci-cpt",
      description: "oci-cpt",
      enableDelete: true,
    });

    const networkFactory = NetworkAbstractFactory(this, compartment, size);

    networkFactory.createVcn();
    networkFactory.createSubnet();
  }
}

