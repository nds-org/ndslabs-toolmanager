# Tool Manager

The Tool Manager provides the ability to configure and launch analysis environments, such as RStudio and Jupyter Notebooks, pulling data from repository software such as Clowder. It began as a feature of the [TERRA-REF](http://terraref.org) project to provide analysis capabilities in Clowder.

## Build
```bash
docker build -t ndslabs/toolmanager .
```

## Run
```bash
docker run -it -p 8082:8082 ndslabs/toolmanager
```

## How It Works
The ToolManager itself runs as a Docker-in-Docker container that can spawn other containers. The Docker-in-Docker paradigm was introduced to ensure that any running instances are cleaned up / deleted if the host container goes down. Otherwise, we are left with dangling containers that must be cleaned up / deleted manually.

Two REST API Endpoints provide restricted access to the underlying Docker daemon: **/tools** and **/instances**

### /tools
* GET - Retrieve the list of all available tools
* POST - Add a new tool to the list (not implemented)
* PUT - Modify a tool on the list (not implemented)
* DELETE - Delete a tool from the list (not implemented)

### /instances
* GET - Retrieve the list of all running instances
* POST - Create and start a new instance of a tool
* PUT - Modify the given running instance (for example, to add another dataset to an existing instance)
* DELETE - Stop and delete the given running instance (not implemented)

## See also
* https://github.com/nds-org/ndslabs
* https://github.com/nds-org/ndslabs-specs
