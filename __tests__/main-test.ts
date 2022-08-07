import "cdktf/lib/testing/adapters/jest"; // Load types for expect matchers
import { Testing } from "cdktf";
import MyStack from "../stack";

import { IdentityCompartment } from "../.gen/providers/oci/identity-compartment";
import { CoreVcn } from "../.gen/providers/oci/core-vcn";
import { CoreSubnet } from "../.gen/providers/oci/core-subnet";

describe("CDKTF OCI Application", () => {
  it("should contains a compartment", () => {
    const app = Testing.app({ stubVersion: false });
    const stack = new MyStack(app, "oci-stack", 5);
    const synth = Testing.synth(stack);
    expect(synth).toHaveResourceWithProperties(IdentityCompartment, {
      name: "oci-cpt",
    });
  });

  it("should contains a small vcn", () => {
    const app = Testing.app({ stubVersion: false });
    const stack = new MyStack(app, "oci-stack", 5);
    const synth = Testing.synth(stack);
    expect(synth).toHaveResourceWithProperties(CoreVcn, {
      cidr_block: "10.0.0.0/24",
    });
  });
  it("should contains a small subnet", () => {
    const app = Testing.app({ stubVersion: false });
    const stack = new MyStack(app, "oci-stack", 5);
    const synth = Testing.synth(stack);
    expect(synth).toHaveResourceWithProperties(CoreSubnet, {
      cidr_block: "10.0.0.0/25",
    });
  });

  it("should contains a big vcn", () => {
    const app = Testing.app({ stubVersion: false });
    const stack = new MyStack(app, "oci-stack", 15);
    const synth = Testing.synth(stack);
    expect(synth).toHaveResourceWithProperties(CoreVcn, {
      cidr_block: "10.0.0.0/16",
    });
  });
  it("should contains a big subnet", () => {
    const app = Testing.app({ stubVersion: false });
    const stack = new MyStack(app, "oci-stack", 15);
    const synth = Testing.synth(stack);
    expect(synth).toHaveResourceWithProperties(CoreSubnet, {
      cidr_block: "10.0.0.0/24",
    });
  });
});

