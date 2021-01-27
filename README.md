![Chefmate Logo](client/frontend/src/images/logo.png)

<h3>
Ashwin Mahesh,
Turner Dunlop,
Nathan Venckus,
Richa Tenany,
Vishva Pandya
Arshad Khan,
</h3>
<h2>Features</h2>
<h3>Crawler</h3>
<p>Update later</p>
<h3>Ranker</h3>
<p>Update later</p>
<h3>Client</h3>
<p>Update later</p>

<h2>Running the Project</h2>
<p>On initial download: "chmod +x start"</p>
<p>First run: ./start dev install</p>
<p>Afterwards: ./start</p>
<p>To run the static build (with full, ie User login and storage, functionality), do "npm run build in client/frontend", then use localhost:8000</p>

<h2>Visual Studio Add-Ons</h2>
<p>Install Prettier and ESLint if you are using Visual Studio. Set formatOnSave to True in your user settings</p>

<h2>Connecting To AWS DB Server</h2>
<p>Download Chefmate.pem and move it to the keys/ folder in the project</p>
<p>chmod 400 chefmate.pem</p>
<p>ssh -i Chefmate.pem ec2-user@18.222.251.5 OR run ./connect in the keys folder</p>
<p>Congratulations you are in the Chefmate DB</p>
<h4>Running the Crawler in the Background of the AWS Server</h4>
<p>nohup ./buildIndex > output.txt &</p>
<h4>Running the Ranker as a Service in AWS</h4>
<p>export FLASK_ENV="production"; python3 ranker.py</p>

<h2>Running the Crawler</h2>
<p>Set the desired number of iterations in main.py</p>
<p>./buildIndex</p>
