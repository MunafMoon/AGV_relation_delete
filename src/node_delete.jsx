import React, { Component } from "react";

export default class Delete_Position extends Component {
  constructor() {
    super();
    this.state = {
      ros: null,
      nodename: [],
      markername: [],
      nodedata: [],
      deletemissionname: "",
      deletemissionname2: "",
      positionname: [],
      deletemissionname3: "",
      children: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetch_node = this.fetch_node.bind(this);
    this.deletemission = this.deletemission.bind(this);
    this.delete = this.delete.bind(this);
    this.deletemission2 = this.deletemission2.bind(this);
    this.delete2 = this.delete2.bind(this);
    this.delete3 = this.delete3.bind(this);
    this.deletemission3 = this.deletemission3.bind(this);
    this.alldelete = this.alldelete.bind(this);
    // this.filterdupli = this.filterdupli.bind(this)
  }

  componentDidMount() {
    this.filterdupli();
  }

  static map_name = "";

  fetch_node() {
    fetch("http://192.168.0.165:8000/nodes")
      .then((response) => response.json())
      .then((data) => {
        var mapname1 = Delete_Position.map_name;
        var temp_data_pos = data.filter(function (el) {
          return el.map_name === mapname1;
        });
        this.setState({
          nodedata: temp_data_pos
        });
      });
    fetch("http://192.168.0.165:8000/nodes")
      .then((response) => response.json())
      .then((data) => {
        var mapname1 = Delete_Position.map_name;
        var selectmarker = data.filter(function (el) {
          return el.map_name === mapname1;
        });
        this.setState({
          markername: selectmarker
        });
      });
    fetch("http://192.168.0.165:8000/nodes")
      .then((response) => response.json())
      .then((data) => {
        var mapname1 = Delete_Position.map_name;
        var selectposition = data.filter(function (el) {
          return el.map_name === mapname1;
        });
        this.setState({
          positionname: selectposition
        });
      });
  }

  alldelete() {
    this.deletemission2();
    this.deletemission();
    this.deletemission3();
    alert("Deleted");
  }

  deletemission() {
    var data = this.state.nodedata;
    var missiondel = this.state.deletemissionname.toString();
    var selectedmission = data.filter(function (el) {
      return el.node_name === missiondel;
    });
    var keyArray = selectedmission.map(function (item) {
      return item["id"];
    });
    if (keyArray != 0) {
      this.delete(keyArray[0]);
    }
  }

  delete(id) {
    fetch("http://192.168.0.165:8000/nodes" + id + "/", {
      method: "DELETE",
      body: JSON.stringify(this.state.nodedata)
    })
      .then((response) => response)
      .then(() => {
        this.fetch_node();
        document.getElementById("DD_node").selectedIndex = 0;
      });
  }

  deletemission2() {
    var data2 = this.state.markername;
    var missiondel2 = this.state.deletemissionname2.toString();
    var selectedmission2 = data2.filter(function (el) {
      return el.marker_name === missiondel2;
    });
    var keyArray2 = selectedmission2.map(function (item) {
      return item["id"];
    });
    if (keyArray2 != 0) {
      this.delete2(keyArray2);
    }
  }

  delete2(id) {
    fetch("http://192.168.0.165:8000/nodes" + id + "/", {
      method: "DELETE",
      body: JSON.stringify(this.state.markername)
    })
      .then((response) => response)
      .then(() => {
        this.fetch_node();
        document.getElementById("DD_node").selectedIndex = 0;
      });
  }

  deletemission3() {
    var data3 = this.state.positionname;
    var missiondel3 = this.state.deletemissionname3.toString();
    var selectedmission3 = data3.filter(function (el) {
      return el.position_name === missiondel3;
    });
    var keyArray3 = selectedmission3.map(function (item) {
      return item["id"];
    });
    if (keyArray3 != 0) {
      this.delete3(keyArray3);
    }
  }

  delete3(id) {
    fetch("http://192.168.0.165:8000/nodes" + id + "/", {
      method: "DELETE",
      body: JSON.stringify(this.state.positionname)
    })
      .then((response) => response)
      .then(() => {
        this.fetch_node();
        document.getElementById("DD_node").selectedIndex = 0;
      });
  }
  // filterdupli() {
  //     var children = this.nodedata.concat(this.state.markername)
  //     console.log(children, "----------------------")

  // }

  render() {
    return (
      <section id="createposition">
        <div className="toppadding">
          <h3>Delete Node</h3>
          <table>
            <tr>
              <td>
                <select
                  id="DD_node"
                  onChange={(e) => {
                    var passval = e.target.value;
                    var data = this.state.nodedata;
                    var selectedmission = data.filter(function (el) {
                      return el.node_name === passval;
                    });
                    var keyArray = selectedmission.map(function (item) {
                      return item["node_name"];
                    });
                    var deduped = Array.from(new Set(keyArray));
                    this.setState({
                      deletemissionname: deduped
                    });

                    var passval2 = e.target.value;
                    var data2 = this.state.markername;
                    var selectedmission2 = data2.filter(function (el) {
                      return el.marker_name === passval2;
                    });
                    var keyArray2 = selectedmission2.map(function (item) {
                      return item["marker_name"];
                    });
                    var deduped = Array.from(new Set(keyArray2));
                    this.setState({
                      deletemissionname2: deduped
                    });

                    var passval3 = e.target.value;
                    var data2 = this.state.positionname;
                    var selectedmission3 = data2.filter(function (el) {
                      return el.position_name === passval3;
                    });
                    var keyArray3 = selectedmission3.map(function (item) {
                      return item["position_name"];
                    });
                    var deduped = Array.from(new Set(keyArray3));
                    this.setState({
                      deletemissionname3: deduped
                    });
                  }}
                >
                  <option value="DD-1" selected disabled="{true}">
                    Select
                  </option>
                  {this.state.nodedata.map((emp) => {
                    return (
                      <option key={emp.key} value={emp.value}>
                        {emp.node_name}
                      </option>
                    );
                  })}
                  {/* {this.state.markername.map((emp) => { return (<option key={emp.key} value={emp.value}>{emp.marker_name}</option>) })} */}
                  {/* {this.state.positionname.map((emp) => { return (<option key={emp.key} value={emp.value}>{emp.position_name}</option>) })} */}
                </select>
              </td>

              <td>
                <button onClick={this.alldelete}>
                  {" "}
                  Delete
                  {/* <MdDeleteForever size={20} color='red' /><p>Delete</p> */}
                </button>
              </td>

              {/* {[...this.state.nodedata,...this.state.markername]} */}
            </tr>
          </table>
        </div>
      </section>
    );
  }
}
