namespace _2024_solar_eclipse_orange_monitor
{
    partial class FrmMain
    {
        /// <summary>
        /// 設計工具所需的變數。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清除任何使用中的資源。
        /// </summary>
        /// <param name="disposing">如果應該處置受控資源則為 true，否則為 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form 設計工具產生的程式碼

        /// <summary>
        /// 此為設計工具支援所需的方法 - 請勿使用程式碼編輯器修改
        /// 這個方法的內容。
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea2 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea3 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series1 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Series series2 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Series series3 = new System.Windows.Forms.DataVisualization.Charting.Series();
            this.panelMain = new System.Windows.Forms.Panel();
            this.lbEventState = new System.Windows.Forms.Label();
            this.lbTime = new System.Windows.Forms.Label();
            this.lbTitle = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.pic_Humidity = new System.Windows.Forms.PictureBox();
            this.pic_temp = new System.Windows.Forms.PictureBox();
            this.lbPressure = new System.Windows.Forms.Label();
            this.lbHumidity = new System.Windows.Forms.Label();
            this.lbTemp = new System.Windows.Forms.Label();
            this.lbState = new System.Windows.Forms.Label();
            this.timerMain = new System.Windows.Forms.Timer(this.components);
            this.chartMain = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.panelMain.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pic_Humidity)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pic_temp)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chartMain)).BeginInit();
            this.SuspendLayout();
            // 
            // panelMain
            // 
            this.panelMain.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(200)))), ((int)(((byte)(200)))), ((int)(((byte)(200)))));
            this.panelMain.Controls.Add(this.lbEventState);
            this.panelMain.Controls.Add(this.lbTime);
            this.panelMain.Controls.Add(this.lbTitle);
            this.panelMain.Controls.Add(this.pictureBox1);
            this.panelMain.Controls.Add(this.pic_Humidity);
            this.panelMain.Controls.Add(this.pic_temp);
            this.panelMain.Controls.Add(this.lbPressure);
            this.panelMain.Controls.Add(this.lbHumidity);
            this.panelMain.Controls.Add(this.lbTemp);
            this.panelMain.Location = new System.Drawing.Point(12, 15);
            this.panelMain.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.panelMain.Name = "panelMain";
            this.panelMain.Size = new System.Drawing.Size(246, 316);
            this.panelMain.TabIndex = 0;
            this.panelMain.MouseDown += new System.Windows.Forms.MouseEventHandler(this.FrmMain_MouseDown);
            this.panelMain.MouseLeave += new System.EventHandler(this.FrmMain_MouseLeave);
            this.panelMain.MouseMove += new System.Windows.Forms.MouseEventHandler(this.FrmMain_MouseMove);
            this.panelMain.MouseUp += new System.Windows.Forms.MouseEventHandler(this.FrmMain_MouseUp);
            // 
            // lbEventState
            // 
            this.lbEventState.AutoSize = true;
            this.lbEventState.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(200)))), ((int)(((byte)(200)))), ((int)(((byte)(200)))));
            this.lbEventState.Font = new System.Drawing.Font("Yu Gothic UI", 9F);
            this.lbEventState.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.lbEventState.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.lbEventState.Location = new System.Drawing.Point(25, 89);
            this.lbEventState.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lbEventState.Name = "lbEventState";
            this.lbEventState.Size = new System.Drawing.Size(45, 20);
            this.lbEventState.TabIndex = 42;
            this.lbEventState.Text = "Event";
            // 
            // lbTime
            // 
            this.lbTime.AutoSize = true;
            this.lbTime.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(200)))), ((int)(((byte)(200)))), ((int)(((byte)(200)))));
            this.lbTime.Font = new System.Drawing.Font("Yu Gothic UI", 9F);
            this.lbTime.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.lbTime.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.lbTime.Location = new System.Drawing.Point(26, 56);
            this.lbTime.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lbTime.Name = "lbTime";
            this.lbTime.Size = new System.Drawing.Size(42, 20);
            this.lbTime.TabIndex = 41;
            this.lbTime.Text = "Time";
            // 
            // lbTitle
            // 
            this.lbTitle.AutoSize = true;
            this.lbTitle.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(200)))), ((int)(((byte)(200)))), ((int)(((byte)(200)))));
            this.lbTitle.Font = new System.Drawing.Font("Yu Gothic", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbTitle.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.lbTitle.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.lbTitle.Location = new System.Drawing.Point(25, 14);
            this.lbTitle.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lbTitle.Name = "lbTitle";
            this.lbTitle.Size = new System.Drawing.Size(162, 26);
            this.lbTitle.TabIndex = 40;
            this.lbTitle.Text = "2024 北美日全食";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::_2024_solar_eclipse_orange_monitor.Properties.Resources.pressure;
            this.pictureBox1.Location = new System.Drawing.Point(26, 249);
            this.pictureBox1.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(50, 50);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 39;
            this.pictureBox1.TabStop = false;
            // 
            // pic_Humidity
            // 
            this.pic_Humidity.Image = global::_2024_solar_eclipse_orange_monitor.Properties.Resources.hum;
            this.pic_Humidity.Location = new System.Drawing.Point(26, 187);
            this.pic_Humidity.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.pic_Humidity.Name = "pic_Humidity";
            this.pic_Humidity.Size = new System.Drawing.Size(50, 50);
            this.pic_Humidity.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pic_Humidity.TabIndex = 38;
            this.pic_Humidity.TabStop = false;
            // 
            // pic_temp
            // 
            this.pic_temp.Image = global::_2024_solar_eclipse_orange_monitor.Properties.Resources.temp;
            this.pic_temp.Location = new System.Drawing.Point(26, 126);
            this.pic_temp.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.pic_temp.Name = "pic_temp";
            this.pic_temp.Size = new System.Drawing.Size(50, 50);
            this.pic_temp.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pic_temp.TabIndex = 37;
            this.pic_temp.TabStop = false;
            // 
            // lbPressure
            // 
            this.lbPressure.AutoSize = true;
            this.lbPressure.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(200)))), ((int)(((byte)(200)))), ((int)(((byte)(200)))));
            this.lbPressure.Font = new System.Drawing.Font("Yu Gothic UI", 9F);
            this.lbPressure.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.lbPressure.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.lbPressure.Location = new System.Drawing.Point(87, 263);
            this.lbPressure.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lbPressure.Name = "lbPressure";
            this.lbPressure.Size = new System.Drawing.Size(89, 20);
            this.lbPressure.TabIndex = 36;
            this.lbPressure.Text = "Air Pressure:";
            // 
            // lbHumidity
            // 
            this.lbHumidity.AutoSize = true;
            this.lbHumidity.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(200)))), ((int)(((byte)(200)))), ((int)(((byte)(200)))));
            this.lbHumidity.Font = new System.Drawing.Font("Yu Gothic UI", 9F);
            this.lbHumidity.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.lbHumidity.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.lbHumidity.Location = new System.Drawing.Point(86, 202);
            this.lbHumidity.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lbHumidity.Name = "lbHumidity";
            this.lbHumidity.Size = new System.Drawing.Size(73, 20);
            this.lbHumidity.TabIndex = 35;
            this.lbHumidity.Text = "Humidity:";
            // 
            // lbTemp
            // 
            this.lbTemp.AutoSize = true;
            this.lbTemp.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(200)))), ((int)(((byte)(200)))), ((int)(((byte)(200)))));
            this.lbTemp.Font = new System.Drawing.Font("Yu Gothic UI", 9F);
            this.lbTemp.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.lbTemp.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.lbTemp.Location = new System.Drawing.Point(85, 137);
            this.lbTemp.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lbTemp.Name = "lbTemp";
            this.lbTemp.Size = new System.Drawing.Size(95, 20);
            this.lbTemp.TabIndex = 34;
            this.lbTemp.Text = "Temperature:";
            // 
            // lbState
            // 
            this.lbState.AutoSize = true;
            this.lbState.Font = new System.Drawing.Font("Segoe UI", 7.8F);
            this.lbState.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.lbState.Location = new System.Drawing.Point(167, 334);
            this.lbState.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.lbState.Name = "lbState";
            this.lbState.Size = new System.Drawing.Size(93, 17);
            this.lbState.TabIndex = 33;
            this.lbState.Text = "No connection";
            this.lbState.Visible = false;
            // 
            // timerMain
            // 
            this.timerMain.Enabled = true;
            this.timerMain.Interval = 1000;
            this.timerMain.Tick += new System.EventHandler(this.timerMain_Tick);
            // 
            // chartMain
            // 
            chartArea1.AxisX.IsLabelAutoFit = false;
            chartArea1.AxisX.LabelStyle.Font = new System.Drawing.Font("Yu Gothic UI", 9F);
            chartArea1.AxisX.LineColor = System.Drawing.Color.DimGray;
            chartArea1.AxisX.MajorGrid.LineColor = System.Drawing.Color.LightGray;
            chartArea1.AxisX.TitleAlignment = System.Drawing.StringAlignment.Far;
            chartArea1.AxisX.TitleFont = new System.Drawing.Font("Yu Gothic UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea1.AxisX2.LineColor = System.Drawing.Color.LightGray;
            chartArea1.AxisX2.MajorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea1.AxisX2.MajorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea1.AxisX2.MinorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea1.AxisX2.MinorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea1.AxisY.IsLabelAutoFit = false;
            chartArea1.AxisY.LabelStyle.Font = new System.Drawing.Font("Yu Gothic UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea1.AxisY.LineColor = System.Drawing.Color.DimGray;
            chartArea1.AxisY.MajorGrid.LineColor = System.Drawing.Color.LightGray;
            chartArea1.AxisY.Title = "Temperature (°C)";
            chartArea1.AxisY.TitleFont = new System.Drawing.Font("Yu Gothic UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea1.AxisY2.LineColor = System.Drawing.Color.LightGray;
            chartArea1.AxisY2.MajorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea1.AxisY2.MajorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea1.AxisY2.MinorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea1.AxisY2.MinorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea1.Name = "ChartArea1";
            chartArea2.AxisX.IsLabelAutoFit = false;
            chartArea2.AxisX.LabelStyle.Font = new System.Drawing.Font("Yu Gothic UI", 9F);
            chartArea2.AxisX.LineColor = System.Drawing.Color.DimGray;
            chartArea2.AxisX.MajorGrid.LineColor = System.Drawing.Color.LightGray;
            chartArea2.AxisX.TitleAlignment = System.Drawing.StringAlignment.Far;
            chartArea2.AxisX.TitleFont = new System.Drawing.Font("Yu Gothic UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea2.AxisX2.LineColor = System.Drawing.Color.LightGray;
            chartArea2.AxisX2.MajorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea2.AxisX2.MajorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea2.AxisX2.MinorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea2.AxisX2.MinorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea2.AxisY.IsLabelAutoFit = false;
            chartArea2.AxisY.LabelStyle.Font = new System.Drawing.Font("Yu Gothic UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea2.AxisY.LineColor = System.Drawing.Color.DimGray;
            chartArea2.AxisY.MajorGrid.LineColor = System.Drawing.Color.LightGray;
            chartArea2.AxisY.Title = "Humidity (%)";
            chartArea2.AxisY.TitleFont = new System.Drawing.Font("Yu Gothic UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea2.AxisY2.LineColor = System.Drawing.Color.LightGray;
            chartArea2.AxisY2.MajorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea2.AxisY2.MajorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea2.AxisY2.MinorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea2.AxisY2.MinorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea2.Name = "ChartArea2";
            chartArea3.AxisX.IsLabelAutoFit = false;
            chartArea3.AxisX.LabelStyle.Font = new System.Drawing.Font("Yu Gothic UI", 9F);
            chartArea3.AxisX.LineColor = System.Drawing.Color.DimGray;
            chartArea3.AxisX.MajorGrid.LineColor = System.Drawing.Color.LightGray;
            chartArea3.AxisX.Title = "Time";
            chartArea3.AxisX.TitleAlignment = System.Drawing.StringAlignment.Far;
            chartArea3.AxisX.TitleFont = new System.Drawing.Font("Yu Gothic UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea3.AxisX2.LineColor = System.Drawing.Color.LightGray;
            chartArea3.AxisX2.MajorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea3.AxisX2.MajorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea3.AxisX2.MinorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea3.AxisX2.MinorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea3.AxisY.IsLabelAutoFit = false;
            chartArea3.AxisY.LabelStyle.Font = new System.Drawing.Font("Yu Gothic UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea3.AxisY.LineColor = System.Drawing.Color.DimGray;
            chartArea3.AxisY.MajorGrid.LineColor = System.Drawing.Color.LightGray;
            chartArea3.AxisY.Title = "Pressure (hPa)";
            chartArea3.AxisY.TitleFont = new System.Drawing.Font("Yu Gothic UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea3.AxisY2.LineColor = System.Drawing.Color.LightGray;
            chartArea3.AxisY2.MajorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea3.AxisY2.MajorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea3.AxisY2.MinorGrid.LineColor = System.Drawing.Color.DarkGray;
            chartArea3.AxisY2.MinorTickMark.LineColor = System.Drawing.Color.DarkGray;
            chartArea3.Name = "ChartArea3";
            this.chartMain.ChartAreas.Add(chartArea1);
            this.chartMain.ChartAreas.Add(chartArea2);
            this.chartMain.ChartAreas.Add(chartArea3);
            legend1.Enabled = false;
            legend1.Name = "Legend1";
            this.chartMain.Legends.Add(legend1);
            this.chartMain.Location = new System.Drawing.Point(273, 14);
            this.chartMain.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.chartMain.Name = "chartMain";
            series1.ChartArea = "ChartArea1";
            series1.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Spline;
            series1.Color = System.Drawing.Color.OrangeRed;
            series1.Legend = "Legend1";
            series1.MarkerColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(128)))));
            series1.Name = "Series1";
            series2.ChartArea = "ChartArea2";
            series2.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Spline;
            series2.Legend = "Legend1";
            series2.Name = "Series2";
            series3.ChartArea = "ChartArea3";
            series3.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Spline;
            series3.Legend = "Legend1";
            series3.Name = "Series3";
            this.chartMain.Series.Add(series1);
            this.chartMain.Series.Add(series2);
            this.chartMain.Series.Add(series3);
            this.chartMain.Size = new System.Drawing.Size(800, 1000);
            this.chartMain.TabIndex = 34;
            this.chartMain.Visible = false;
            // 
            // FrmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(270, 354);
            this.Controls.Add(this.chartMain);
            this.Controls.Add(this.lbState);
            this.Controls.Add(this.panelMain);
            this.Font = new System.Drawing.Font("Yu Gothic UI", 9F);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.Name = "FrmMain";
            this.Text = "FrmMain";
            this.Load += new System.EventHandler(this.FrmMain_Load);
            this.MouseDown += new System.Windows.Forms.MouseEventHandler(this.FrmMain_MouseDown);
            this.MouseLeave += new System.EventHandler(this.FrmMain_MouseLeave);
            this.MouseMove += new System.Windows.Forms.MouseEventHandler(this.FrmMain_MouseMove);
            this.MouseUp += new System.Windows.Forms.MouseEventHandler(this.FrmMain_MouseUp);
            this.panelMain.ResumeLayout(false);
            this.panelMain.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pic_Humidity)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pic_temp)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chartMain)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel panelMain;
        private System.Windows.Forms.Label lbState;
        private System.Windows.Forms.Timer timerMain;
        private System.Windows.Forms.Label lbPressure;
        private System.Windows.Forms.Label lbHumidity;
        private System.Windows.Forms.Label lbTemp;
        private System.Windows.Forms.PictureBox pic_temp;
        private System.Windows.Forms.PictureBox pic_Humidity;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Label lbTime;
        private System.Windows.Forms.Label lbTitle;
        private System.Windows.Forms.Label lbEventState;
        private System.Windows.Forms.DataVisualization.Charting.Chart chartMain;
    }
}

