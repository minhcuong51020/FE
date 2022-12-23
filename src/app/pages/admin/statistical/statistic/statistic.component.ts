import { Component, OnInit } from '@angular/core';
import { PostsService } from '@shared/services/posts/posts.service';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables)
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  totalPost!: number;
  totalUser!: number;
  chart!: any;
  date: any = null;
  constructor(
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.initDate();

    this.postService.statisticalTotalPost().subscribe(
      (res) => {
        this.totalPost = res.body?.data.total;
      }
    )

    this.postService.statisticalTotalUser().subscribe(
      (res) => {
        this.totalUser = res.body?.data.total;
      }
    )
    
    this.createChart(2022);
  }

  initDate(): void {
    this.date = new Date();
  }

  onChange(result: Date): void {
    this.createChart(result.getFullYear())
  }

  createChart(year: any): void {
    this.postService.statisticalPostByYear(year).subscribe(
      (res) => {
        const response = res.body?.data;
        const labels: any[] = [];
        const values: any[] = [];
        response.forEach(
          (item: any) => {
            labels.push(`Tháng ${item.month}`);
            values.push(item.total);
          }
        )
        if(this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart("MyChart", {
          type: 'bar',
    
          data: {
            labels: labels,
             datasets: [
              {
                label: "Số lượt gửi bài viết",
                data: values,
                backgroundColor: 'limegreen'
              }  
            ]
          },
        });
      }
    )
  }

}
