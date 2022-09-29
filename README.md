# Oil Field Manager
Oil Field Manager is a project to demonstrate my abilities: 

1. To develop a single page application using [React](https://reactjs.org/) with proper routing settings;
2. To visualize the information provided by the Completion and Production csv files;
3. To maintain good user experience and performance while working with fairly large dataset;
3. Provide the ability to search information associated with files and displays updated results.

## App context
Imagine you are a field engineer who manages oil wells and want to optimize the production of your field. In order to tune the advance ML models correctly, you want to explore historical dataset in order to understand the physical properties of the field better. You have the production records and completion records of the wells. 

## SourceFiles

### Completions

#### Columns
|wellName|wellAPI|boreID|compSubId|Type|X|Y|TD|IsHorizontal|reservoir|faultBlock|compartment|maxBHP|long|lat|
|--------|-------|------|---------|----|-|-|--|------------|---------|----------|-----------|------|----|---|

### Production
#### Columns
|year|month|wellAPI|boreID|completionGroupSubId|bhp|oil|water|gas|waterInj|compl|flowDays|pressure|status|
|----|-----|-------|------|--------------------|---|---|-----|---|--------|-----|--------|--------|------|


### Relationships
These files are related to each other by the following column definitions.

|Completions Column|   |Production Column   |
|------------------|---|--------------------|
|wellAPI           | = |wellAPI             |
|boreID            | = |boreID              |
|compSubId         | = |completionGroupSubId|

## Dashboard
This app provides you the ability to filter based on wells, reservoirs (wells that are next to each other could drill into different reserviors with completely different physical properities and thus have radically different outputs), and type in the main control area. They can control four views: the map, the list, the monthly crude oil production stream chart, and the aggregated gross production chart. 

![Screen Shot 2022-09-28 at 11 15 57 PM](https://user-images.githubusercontent.com/17770824/192937583-c4d32a67-442d-4206-bf86-128dec1386bf.png)

### Map
On the map, injectors and producers are marked by the water drop icon and oil rig icon. 
You can also see the relationship between the wells, as wells drilling from different reservoirs are marked by different color icons. 

![Screen Shot 2022-09-28 at 11 18 12 PM](https://user-images.githubusercontent.com/17770824/192937865-d1478108-6a0a-457f-91e6-26adf1346af3.png)
![Screen Shot 2022-09-28 at 11 18 27 PM](https://user-images.githubusercontent.com/17770824/192937875-01b4345b-b71e-4f33-b0a9-a658ebeb9817.png)

### List
With the filter controls, you can explore the data details using the table. Due to size of the data, I set up the table with pages and virtual scrolling. You can sort the multiple colmns. 
For example, this shows you for well 18, what are the dates that it produced the most water.
![Screen Shot 2022-09-28 at 11 24 32 PM](https://user-images.githubusercontent.com/17770824/192938498-6e4e5b0e-9283-46a6-b92b-964faae0f7e8.png)

### Streamgraph
Streamgraph shows the monthly crude oil production by different reserviors.
![Screen Shot 2022-09-28 at 11 30 04 PM](https://user-images.githubusercontent.com/17770824/192939150-2677648c-ad64-4712-8349-c9b82ff6fed5.png)

### Gross production over time
Gross production chart is a dual-axis chart that shows the monthly production of crude oil (in barrels), gas (in barrel equivalence), and water (in mscf) over time. It is the aggregated result from the selected wells and reserviors. (Only producers have production data). 
![Screen Shot 2022-09-28 at 11 31 21 PM](https://user-images.githubusercontent.com/17770824/192939297-34a77e7a-26bc-4094-acad-4fed9359612b.png)

You can use it on individual well to verify if the data makes sense.
![Screen Shot 2022-09-28 at 11 34 06 PM](https://user-images.githubusercontent.com/17770824/192939655-4dd126c8-0266-4d34-b966-6654b1310314.png)

## Use case:

You can select a group of wells, use the four views to cross verify your analysis, and remove noise wells, so you can get a higher quality dataset to train the ML model. 
![Screen Shot 2022-09-28 at 11 36 39 PM](https://user-images.githubusercontent.com/17770824/192939954-80f82870-144a-4880-8adf-bbbe6b8efd0e.png)
![Screen Shot 2022-09-28 at 11 37 20 PM](https://user-images.githubusercontent.com/17770824/192940076-56aee3e6-8fa1-487c-a952-fad24411e7ab.png)
![Screen Shot 2022-09-28 at 11 37 31 PM](https://user-images.githubusercontent.com/17770824/192940302-acfc322d-e731-4e05-aa98-f04e026341dd.png)
![Screen Shot 2022-09-28 at 11 41 37 PM](https://user-images.githubusercontent.com/17770824/192940544-93f99c8d-b7d6-47ae-b348-15bde1aa855f.png)

### Tools used
This app is built with create-react-app, with the following tools:
- Kendo React for components (https://www.telerik.com/kendo-react-ui/components/introduction/) and table view, 
- Map-gl (https://visgl.github.io/react-map-gl/) for map and markers, 
- Highcharts for charts
- React context and hooks for state management 

#### Due to time limit, there are more I would like to add to the project. For instance, add tooltip or interactions to the markers on the map view, and add more guidance and description texts and tooltips to charts and labels. If the file is 10 times larger than right now, then I would move the calculation and data transformation part to workers, let the calculation happen quietly behind the sceen, so that the UI won't freeze. Moving it to microservices (like OData and etc) may be another solution.   
