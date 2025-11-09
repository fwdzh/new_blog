---
date: 2025-03-01
title: 2024四川省大学生程序设计竞赛
---

> 这是我这学期第一次打到团队赛，也是今年第一次。另外两个小伙伴应该是以前从来没打过团队赛。打了三小时左右，但1时17分之后，就没有AC过了。还行啦，慢慢来，先一周一次团队赛保持下感觉好了。

# 2024四川省大学生程序设计竞赛

比赛链接: https://codeforces.com/gym/105222

榜单链接: https://board.xcpcio.com/provincial-contest%2F2024%2Fsichuan?group=official

赛时只通过了三题： E H L

H 可能稍微要推一会，E 单纯是题目描述非常迷惑。如果没有理解问题，感觉也是十多分钟能AC的。L 就排个序就行。。。这次真就只签了个到。后面的写不了了。

## B

疯狂分类讨论。。。

要非常仔细才行，千万不能写得烦。VP本来就应该写出来的，早知道稍微多看一会，好好仔细讨论一下，想一下就好了。

现在再看全部重新写，一小时WA了11次然后过了。

```cpp
void solve()
{
    int ans = 0;
    array<int, 6> a;
    for (int i = 1; i <= 5; i++)
        cin >> a[i];
    // 0 0 3 0 3
    ans += a[3] / 2, a[3] %= 2;
    // 如果4需要3，那么2肯定没了。
    {
        int mn = min(a[2], a[4]);
        ans += mn, a[2] -= mn, a[4] -= mn;
    }
    // 3 给自己用肯定是最优的，剩下的先不要急着变成1吧。说不定能 1 2 3加一起
    {
        int mn = min(a[1], a[5]);
        ans += mn, a[1] -= mn, a[5] -= mn;

        mn = min(a[3], a[5]);
        ans += mn, a[3] -= mn, a[5] -= mn;

        mn = min(a[2], a[5]);
        ans += mn, a[2] -= mn, a[5] -= mn;

        mn = min(a[4], a[5]);
        ans += mn, a[4] -= mn, a[5] -= mn;

        // 5 肯定一个都没有了 或者其他的一个都没有了

        // 好吧 ，5可能还有
        ans += a[5] / 2, a[1] += a[5] % 2, a[5] = 0;
    }
    // 3 2 1 一起 ，还是给4？

    // 1 2 3组一起的话一定是需要1的，最好先别把1用完

    {
        // 如果还有4，那么肯定没有2了，只剩下1
        int mn = min(a[1] / 2, a[4]);
        ans += mn, a[1] -= 2 * mn, a[4] -= mn;
        // 如果a[4]还有，那么肯定最多1个1

        ans += a[4] / 3, a[4] %= 3;
        if (a[4] == 2) {
            if (a[1]) {
                a[1]--, a[4] = 0, ans++;
            } else if (a[3]) {
                a[3]--, a[4] = 0, ans++;
            } else {
                a[1] += a[4], a[4] = 0;
            }
        } else if (a[4] == 1) {
            assert(a[1] <= 1);
            if (a[3] && a[1]) {
                a[3]--, a[1]--, a[4]--, ans++;
            } else {
                a[1] += a[4], a[4] = 0;
            }
        }
    }

    if (a[3]) {
        // 2 现在只能给 3 用了
        if (a[2] && a[1]) {
            ans++, a[2]--, a[1]--, a[3] = 0;
        } else if (a[1] >= 3) {
            a[1] -= 3, ans++, a[3] = 0;
        } else if (a[2] >= 2) {
            a[2] -= 2, a[3] = 0, ans++;
        } else {
            a[1] += a[3], a[3] = 0;
        }
        // 如果这里不能消耗3，那么转换成1
    }
    {
        // 可能还有2
        ans += a[2] / 3, a[2] %= 3;
    }
    {
        // 可能还会剩1和2
        if (a[2] == 1) {
            if (a[1] >= 4) {
                ans++, a[2] = 0, a[1] -= 4;
            }
        } else if (a[2] == 2) {
            if (a[1] >= 2) {
                ans++, a[2] = 0, a[1] -= 2;
            }
        }
        // 只剩1了应该
        ans += a[1] / 6, a[1] %= 6;
    }
    // for (int i = 1; i <= 5; i++)
    //     cerr << a[i] << " \n"[i == 5];
    cout << ans << '\n';
}
```

## E

要用 L 形来填满网格。但是并非填满。它题目，我们明明看着是如果还剩一个格子没有被覆盖，且没有覆盖的格子在第一行第 $m$ 列，那么这个也是一个合法的方案。但是实际上，说的是必须空一个格子不被覆盖，且必须在第  $1$ 行第 $m$ 列空着。

那么就很好判断了。直接就检查是不是三个一组，是不是每个格子都被覆盖。

幸好有样例第二个，不然真看不出来。

```cpp
constexpr int N = 500*500;
int cnt[N+1];

void solve()
{
    int n,m;
    cin>>n>>m;
    vector<string>s(n);
    for(int i=0;i<n;i++){
        cin>>s[i];
    }
    vector<vector<int>>C(n+1,vector<int>(m+1));
    int tot=0;
    for(int i=0;i<n;i++)
        for(int j=0;j<m;j++){
            if(s[i][j]=='C'){
                C[i][j]=++tot;
                cnt[tot]=0;
                if(i-1>=0&&s[i-1][j]=='D'){
                    C[i-1][j]=tot;
                }
                if(i+1<n&&s[i+1][j]=='U'){
                    C[i+1][j]=tot;
                }
                if(j-1>=0&&s[i][j-1]=='R'){
                    C[i][j-1]=tot;
                }
                if(j+1<m&&s[i][j+1]=='L'){
                    C[i][j+1]=tot;
                }
            }
        }
    // cout<<'\n';
    for(int i=0;i<n;i++)
        for(int j=0;j<m;j++){
            // cout<<C[i][j]<<" \n"[j+1==m];
            cnt[C[i][j]]++;
        }
    int all=0;
    for(int i=1;i<=tot;i++){
        // cerr<<cnt[i]<< '\n';
        all+=cnt[i];
        if(cnt[i]!=3){
            cout<<"No\n";
            return;
        }
    }
    // cerr<<all<<'\n';
    // if(all==n*m){
    //     cout<<"Yes\n";
    // }else 
    if(all==n*m-1&&s[0][m-1]=='.')
        cout<<"Yes\n";
    else
        cout<<"No\n";
}
```

## F

还真不难，也是稍微想一下就行。

下次比赛真的得好好思考，这场其实可写题还挺多的来着。BF如果多想会是能出的。补这2题都没看题解，感觉确实不难的。

这题我只搜了一下怎么判断直线过矩形。。。其实向量怎么表示直线方程也不太记得。

假如方向向量是 $(vx,vy)$ 那么直线方程是 $vx(y-y_0)=vy(x-x_0)$ ， $(x_0,y_0)$ 为起点位置。判断两点是否在直线同侧，只需要看带入直线方程后结果的正负。同号则同侧，等于0则在直线上。

我们可以算出圆心在矩形中的合法范围，也就是 $(lx+r,ly+r)$ 和 $(rx-r,ry-r)$ 之间的矩形区域。我们只需要看圆心是否会经过这个区域就行了。

可以判断是否和矩形的每条边相交。也可以直接将四个点带入直线方程，判断是否四个点都位于直线同侧。但是要注意的这个直线是有方向的，也许会往反方向走，但是判的能相交，这个可以特判一下直接输出。

```cpp
void solve()
{
    int x, y, r, vx, vy;
    cin >> x >> y >> r >> vx >> vy;
    // 可以直接算出圆心放在哪个矩形可以使得满足条件。
    // 然后判断圆心的运动轨迹是否会经过这个区域。
    // 可以将顶点都带入直线方程，看是否都在直线同侧。
    // 运动路径可以表示为 vx * (Y-y) = vy * (X-x)

    // 圆心需要在
    int lx, ly, rx, ry;
    cin >> lx >> ly >> rx >> ry;
    // 圆心必须在 (lx+r,ly+r) 和 (rx-r,ry-r) 之间
    if (rx - lx < 2 * r || ry - ly < 2 * r) {
        cout << "No\n";
        return;
    }
    // 由于是有方向的 我们直接来简单判断一下会不会经过
    if (x > rx - r || y > ry - r) {
        if (vx >= 0 && vy >= 0) {
            cout << "No\n";
            return;
        }
    }
    if (y > ry - r || x < lx + r) {
        if (vx <= 0 && vy >= 0) {
            cout << "No\n";
            return;
        }
    }
    if (y < ly + r || x < lx + r) {
        if (vx <= 0 && vy <= 0) {
            cout << "No\n";
            return;
        }
    }
    if (y < ly + r || x > rx - r) {
        if (vx >= 0 && vy <= 0) {
            cout << "No\n";
            return;
        }
    }
    auto calc = [&](int X, int Y) {
        return 1LL * vx * (Y - y) - 1LL * vy * (X - x);
    };
    set<long long> st;
    st.insert(calc(lx + r, ly + r));
    st.insert(calc(lx + r, ry - r));
    st.insert(calc(rx - r, ry - r));
    st.insert(calc(rx - r, ly + r));
    if (((*st.begin() < 0) && (*st.rbegin() > 0)) || st.contains(0))
        cout << "Yes\n";
    else
        cout << "No\n";
}
```

## H

稍微推一下前面几个啊，然后就可以 guess 了，找规律。

```
//1 G ,1
//2 G ,2
//3 Y ,1
//4 G ,2
//5 G ,3 , 3 Y , 1 G
//6 Y ,2
//7 G ,3
//8 G ,4 
//9 Y ,3 , 7 Y , 3
//10 G
//11 G
```

这是我们推的，就是 $n$ 为多少，然后谁能赢，能拿到多少个石头。

写这么几个大概就能看出来，一定是可以直接确定谁能赢的。两个人都希望能拿走尽可能多的石头，所以如果你怎么选都是输，那肯定就是拿 2 个。

前面推的就是，显然 1 和 2 个石头时，先手必赢。如果是 3 个石头，那么先手的人一定会把他转换成 2 或 1，且另一个人先手，于是变成另一个人的必胜状态。所以就多推几个就可以猜啦。

```cpp
void solve()
{
    long long n;
    cin>>n;
    long long ans=(n-1)/3+1;
    if(n%3==0){
        cout<<"1 ";
        cout<<ans<<'\n';
    }else{
        cout<<"0 ";
        if(n%3==2) cout<<ans+1<<'\n';
        else cout<<ans<<'\n';
    }
}
```

## L

这个就是很签到啦。

就看把哪个放到第一个锅，哪个放第二个锅。

然后按值排序输出下标即可。

```cpp
void solve()
{
    int n;
    cin >> n;
    vector<pair<int, int>> v1, v2;
    for (int i = 1; i <= n; i++) {
        int a, b, c, d;
        cin >> a >> b >> c >> d;
        if (c == d) {
            if (a < b) {
                v1.push_back({ a, i });
            } else {
                v2.push_back({ b, i });
            }
        } else if (c)
            v1.push_back({ a, i });
        else
            v2.push_back({ b, i });
    }
    sort(v1.begin(),v1.end(),[](pair<int,int>x,pair<int,int>y){
        return x.first<y.first;
    });
    sort(v2.begin(),v2.end(),[](pair<int,int>x,pair<int,int>y){
        return x.first<y.first;
    });
    cout<<v1.size()<<' ';
    for(auto [_,i]:v1)
        cout<<i<<" ";
    cout<<'\n';
    cout<<v2.size()<<' ';
    for(auto [_,i]:v2)
        cout<<i<<" ";
}
```
