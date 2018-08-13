## Ask Jeeves: Backend integration of mobile applications using AWS AppSync

##  Getting Started
These instructions will get you a copy of the project up and running on your AWS account.

1.	Login to AWS console and make sure to select Singapore (`ap-southeast-1`) region. You need to be in **Singapore** region for this lab. 
2.	Go to EC2 page and create a new key pair if not already exists and download the key to your machine.
3.	Open AWS Cloud9 services page.
4. Click on **Create Environment**.
![AWS Cloud9 Create Environment](images/aws-cloud9-create.png)
5. Give any appropriate name and description to your environment. Click on **Next**.
6. In the next page, select the option **Connect and run in remote server (SSH)**. Scroll down and expand View Public SSH key. Click **Copy key to clip board**. Once you have copied the key, please leave this screen intact. We will come back once the EC2 creation completed. ![AWS Cloud9](images/aws-cloud9-remote-server.png)
7. Open a new browser tab and instantiate this CloudFormation template: [![Cloudformation](images/aws-cloudformation-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/new?templateURL=https://s3-ap-southeast-1.amazonaws.com/techsummit2018appsync/prereqscfn.json) 
8. Click on **Next**. ![](images/aws-cloudformation-scr1.png)
9. Please provide below inputs
	* Stack Name :  cloud9env (any name as you prefer)
	* Cloud9Key : Paste the key you have copied in the step 6
	* InstanceType : You can leave the default (c4.xlarge)
	* KeyName : Please select the existing key in this region(Singapore). If not, please create one 
	* SSHLocation : We can leave as the default value.
	![](images/aws-cloudformation-scr2.png) 
	Click on **Next**.
10. Leave the defaults as-is on this screen, click **Next**.
11. In Next screen, Select the checkbox for “I acknowledge that cloudformation might create IAM resouces” in the bottom and Click **Create**.
12. Once the stack creation completes, Go to Outputs and copy the IP address as below ![Cloudformation complete](images/aws-cloudformation-scr3.png)
13. Go to the cloud9 screen/tab when we left in the step 6 and fill the below details and then click Next step
	* User : ec2-user
	* Host : Paste the IP address copied from the cloudformation stack in step 12
	* Port : 22
	* Advanced settings. Environment path – give any pathname (without spaces)
	![AWS Cloud9](images/aws-cloud9-ec2-connect.png)
14. Click **Create environment**.
    ![AWS Cloud9](images/aws-cloud9-ec2-connect2.png)
15. In the below screen, uncheck the “c9.ide.lambda.docker”. Click **Next**.
	![AWS Cloud9](images/aws-cloud9-env-ready1.png)
16. In the next screen, click cancel the installation and click Finish. We do not need lambda related stuffs for now
	![AWS Cloud9](images/aws-cloud9-env-ready2.png)
17. Click **Finish** in the below screen
	![AWS Cloud9](images/aws-cloud9-env-ready3.png)
16. Your cloud9 environment is ready
	![AWS Cloud9](images/aws-cloud9-env-ready4.png)

## Customizing the Cloud9 Environment

1. Go to the newly cloud9 environment and click the settings, select THEMES(top right corner near cloud9 symbol). Select one of the Classic theme and night based color ( this is needed for the QR code to be visible for the expo client).
    ![AWS Cloud9](images/aws-cloud9-theme1.png)
2. Once the theme got changed, open terminal window. The current working directory will be whatever the environment name you have given during the cloud9 create environment steps.
3. One a shell/terminal and run command `create-react-native-app Test`.
    ![AWS Cloud9](images/aws-cloud9-theme2.png)
    ![AWS Cloud9](images/aws-cloud9-theme3.png)
4. Once the creation is success, you will see the final confirmation as below. Also, in your cloud9 IDE, you will see the project folder “Test”.
	![AWS Cloud9](images/aws-cloud9-theme4.png)
5. `cd Test; npm start`
	![AWS Cloud9](images/aws-cloud9-react-app1.png)
	![AWS Cloud9](images/aws-cloud9-react-app2.png)
6. Now, from your mobile, open the expo app.
7. Scan the QR code on the expo app and you will see the application loading in your mobile.



2. Find the instance you have just created by launching a Cloud9 environment. The name will be `aws-cloud9-<your environment name>-<random string>`
![AWS EC2 Found](images/aws-ec2-found.png)

3. Select the instance. Scroll down at the bottom part. Find the Block devices.
![AWS EC2 Block Device](images/aws-ec2-block-devices.jpg)

4. Click onto it. You will see a pop up.
![AWS EC2 Select Block Device](images/aws-ec2-block-device-popup.jpg)

5. Right click on it and open in new tab.
![AWS Open New Tab](images/aws-open-new-tab.jpg)

6. Click on **Actions**, **Modify Volume**.
![AWS EC2 Modify Volume](images/aws-ec2-modify-volume.jpg)

7. Change *8* to *120* and click on **Modify**.
![AWS EC2 Volume Modified](images/aws-ec2-volume-modified.jpg)

8. Click on **Yes** and wait for the change. It will take a couple of minutes.
![AWS EBS Changed](images/aws-ebs-changed.jpg)

## Configure security group
AWS Cloud9 restricts inbound access to the IP addresses it uses to connect to the instance. In addition, we will need to allow traffic on `8080` which is used by Expo. Refer to the [Expo docs](https://docs.expo.io/versions/v29.0.0/guides/how-expo-works.html) to learn more.

1. Go back to the tab where you have the EC2 instances.

2. Select the same EC2 instance and select the security group
![AWS EC2 Security Group](images/aws-ec2-security-group.jpg)

3. At the Security Group, click on **Inbound**, then Edit.
![AWS Security Group](images/aws-security-group.jpg)

4. Click on **Add Rule**
![AWS Add Security Group Rule](images/aws-add-security-group-rule.jpg)

5. Key in `8080`, and `0.0.0.0/0`, in respective fields
![AWS Add New Rule](images/aws-add-new-rule.jpg)

6. Click on **Save**.
![AWS Save New Rule](images/aws-security-group-rule-save.jpg)

7. Double-check that the new inbound rules have been added
![AWS Security Group New Rule](images/aws-security-group-new-rule.jpg)

