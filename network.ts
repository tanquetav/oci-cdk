import { Construct } from "constructs";
import { CoreVcn } from "./.gen/providers/oci/core-vcn";
import { CoreSubnet } from "./.gen/providers/oci/core-subnet";
import { IdentityCompartment } from "./.gen/providers/oci/identity-compartment";

export interface Network {
  createVcn(): CoreVcn;
  createSubnet(): CoreSubnet;
}

export class SmallNetwork implements Network {
  private readonly scope: Construct;
  private readonly compartment: IdentityCompartment;
  vcn?: CoreVcn;
  constructor(_scope: Construct, _compartment: IdentityCompartment) {
    this.scope = _scope;
    this.compartment = _compartment;
  }
  public createVcn(): CoreVcn {
    this.vcn = new CoreVcn(this.scope, "vcn", {
      compartmentId: this.compartment.id,
      cidrBlock: "10.0.0.0/24",
    });
    return this.vcn;
  }

  public createSubnet(): CoreSubnet {
    return new CoreSubnet(this.scope, "subnet", {
      compartmentId: this.compartment.id,
      cidrBlock: "10.0.0.0/25",
      vcnId: this.vcn?.id ?? "",
    });
  }
}

