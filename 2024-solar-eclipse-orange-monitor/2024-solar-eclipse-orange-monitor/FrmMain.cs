using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Ports;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace _2024_solar_eclipse_orange_monitor
{
    public partial class FrmMain : Form
    {
        public struct Event
        {
            public DateTime time;
            public string name;
        }
        Random rnd = new Random();
        //DateTime
        Event [] es = new Event[5];
        DateTime C1 = new DateTime(2024, 4, 9, 1,23,37);
        DateTime C2 = new DateTime(2024, 4, 9, 2, 40, 56);
        DateTime Mx = new DateTime(2024, 4, 9, 2, 43, 07);
        DateTime C3 = new DateTime(2024, 4, 9, 2, 45, 18);
        DateTime C4 = new DateTime(2024, 4, 9, 4, 3, 13);
        
        public static SerialPort s = new SerialPort();
        //Form Move
        private bool mouseDown;
        private Point lastLocation;

        //Data
        private double temperature = 0.0, humidity = 0.0, air_pressure = 0.0;
        //Read Serial
        private string rece_Data, recvBuff;
        //Log Record
        const string logFileFolder = "C:\\Airy\\";
        public FrmMain()
        {
            InitializeComponent();
            es[0].time = C1;
            es[0].name = "初虧";
            es[1].time = C2;
            es[1].name = "食既";
            es[2].time = Mx;
            es[2].name = "食甚";
            es[3].time = C3;
            es[3].name = "生光";
            es[4].time = C4;
            es[4].name = "復圓";

        }

        private void FrmMain_MouseDown(object sender, MouseEventArgs e)
        {
            mouseDown = true;
            lastLocation = e.Location;
        }

        private void FrmMain_MouseUp(object sender, MouseEventArgs e)
        {
            mouseDown = false;
        }

        private void FrmMain_MouseLeave(object sender, EventArgs e)
        {
            mouseDown = false;
        }

        private void FrmMain_MouseMove(object sender, MouseEventArgs e)
        {
            if (mouseDown)
            {
                this.Location = new Point(
                    (this.Location.X - lastLocation.X) + e.X, (this.Location.Y - lastLocation.Y) + e.Y);

                this.Update();
            }
        }

        private void FrmMain_Load(object sender, EventArgs e)
        {
            try
            {
                s.PortName = "COM11";
                s.BaudRate = 115200;
                s.Open();
                Thread.Sleep(1000);
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            //ThreadReadloop();
        }

        private void timerMain_Tick(object sender, EventArgs e)
        {
            DetermineState();
            RequestData();

            threadReadSerial();
        }
        private void threadReadSerial()
        {
            int startPos, endPos;
            if (s.IsOpen)
            {
                if (s.BytesToRead > 0)
                {
                    try
                    {
                        recvBuff = s.ReadLine();
                        startPos = recvBuff.LastIndexOf(":");
                        endPos = recvBuff.LastIndexOf("#");

                        if (endPos != -1)
                        {
                            if ((startPos != -1) && (startPos < endPos))
                            {
                                if (endPos < startPos) return;
                                rece_Data = recvBuff.Substring(startPos + 2, endPos - startPos - 1);
                                //recvBuff = recvBuff.Remove(0, endPos + 1);
                            }
                        }
                        GetData(rece_Data);
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show(ex.Message);
                    }
                }
            }
            else
            {
                temperature = rnd.Next(100);
                humidity = rnd.Next(100);
                air_pressure = 1000 + rnd.Next(100);
                UpdateUI();
            }
        }

        private void GetData(string cmd)
        {
            var recArray = cmd.Split(',');
            temperature =  Convert.ToDouble(recArray[0]);
            humidity = Convert.ToDouble(recArray[1]);
            air_pressure = Convert.ToDouble(recArray[2]);
            UpdateUI();
        }

        private void RequestData()
        {
            if (s.IsOpen)
            {
                s.WriteLine(":I#");
                lbState.Text = "Connected";
            }
            else lbState.Text = "No connection";
        }
        private void UpdateUI()
        {
            lbTemp.Text = string.Format("{0:N2} ˚C", temperature);
            lbHumidity.Text = string.Format("{0:N2} %", humidity);
            lbPressure.Text = string.Format("{0} hPa", air_pressure);
            Plot();
            WriteLog(string.Format("{0:N2},", temperature) + string.Format("{0:N2},", humidity)+ string.Format("{0}", air_pressure));
        }

        private void Plot()
        {
            chartMain.Series[0].Points.AddXY(DateTime.Now.ToString("HH:mm:ss"), temperature);
            chartMain.Series[1].Points.AddXY(DateTime.Now.ToString("HH:mm:ss"), humidity);
            chartMain.Series[2].Points.AddXY(DateTime.Now.ToString("HH:mm:ss"), air_pressure);
            if (chartMain.Series[0].Points.Count >= 1800)
            {
                chartMain.Series[0].Points.RemoveAt(0);
                chartMain.Series[1].Points.RemoveAt(0);
                chartMain.Series[2].Points.RemoveAt(0);
            }
            double minY = chartMain.Series[0].Points.Select(v => v.YValues[0]).Min();
            double maxY = chartMain.Series[0].Points.Select(v => v.YValues[0]).Max();
            chartMain.ChartAreas[0].Axes[1].Maximum = ((Int16)((maxY + 2) * 10)) * 0.1;
            chartMain.ChartAreas[0].Axes[1].Minimum = ((Int16)((minY - 2) * 10)) * 0.1;

            minY = chartMain.Series[1].Points.Select(v => v.YValues[0]).Min();
            maxY = chartMain.Series[1].Points.Select(v => v.YValues[0]).Max();
            double _x = (Int16)(maxY) + 5.0;
            if (_x > 100) _x = 100;
            double _i = (Int16)(minY) - 5.0;
            if (_i < 0) _i = 0;
            chartMain.ChartAreas[1].Axes[1].Maximum = _x;
            chartMain.ChartAreas[1].Axes[1].Minimum = _i;

            minY = chartMain.Series[2].Points.Select(v => v.YValues[0]).Min();
            maxY = chartMain.Series[2].Points.Select(v => v.YValues[0]).Max();
            chartMain.ChartAreas[2].Axes[1].Maximum = (Int16)(maxY) + 5.0;
            chartMain.ChartAreas[2].Axes[1].Minimum = (Int16)(minY) - 5.0;

            // Set the size of the image (in pixels)
            int width = 800; // Example width
            int height = 1000; // Example height

            // Create a Bitmap object with the desired resolution
            Bitmap bmp = new Bitmap(width, height);

            // Render the chart onto the Bitmap
            chartMain.DrawToBitmap(bmp, new Rectangle(0, 0, width, height));

            // Save the Bitmap to a file with the specified resolution
            string imagePath = Path.GetDirectoryName(Application.ExecutablePath) + $"/{DateTime.Now.ToString("HHmmss")}.png";
            bmp.Save(imagePath, System.Drawing.Imaging.ImageFormat.Png);

            // Dispose the Bitmap to free up resources
            bmp.Dispose();

        }

        private void DetermineState()
        {
            DateTime t = DateTime.UtcNow.AddHours(-5);
            lbTime.Text = t.ToString("HH:mm:ss") + " (UTC -5)";

            DateTime tnow = DateTime.Now;
            for (int i  =0; i < 5; i++)
            {
                TimeSpan l = es[i].time - tnow;
                if (l.TotalSeconds > 0)
                {
                    string formattedTimeSpan = string.Format("{0:D2} : {1:D2} : {2:D2}", l.Days*24 + l.Hours, l.Minutes, l.Seconds);
                    lbEventState.Text = es[i].name + " \t " + formattedTimeSpan;
                    break;
                }
            }
            
        }

        public static void WriteLog(string strLog)
        {
            StreamWriter log;
            FileStream fileStream = null;
            DirectoryInfo logDirInfo = null;
            FileInfo logFileInfo;
            string logFilePath = logFileFolder + "SolarEclipseRecord-" + DateTime.Today.ToString("MM-dd-yyyy") + "." + "txt";
            logFileInfo = new FileInfo(logFilePath);
            logDirInfo = new DirectoryInfo(logFileInfo.DirectoryName);
            if (!logDirInfo.Exists) logDirInfo.Create();
            if (!logFileInfo.Exists)
            {
                fileStream = new FileStream(logFilePath, FileMode.Create, FileAccess.Write, FileShare.ReadWrite);
            }
            else
            {
                fileStream = new FileStream(logFilePath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);
            }

            log = new StreamWriter(fileStream);
            log.WriteLine(DateTimeOffset.UtcNow.ToUnixTimeSeconds() + "," + strLog);
            log.Close();
        }
    }
}
