---
date: 2025-05-10
title: 2024 年陕西省第十二届国际大学生程序设计竞赛省赛
---

# 2024 年陕西省第十二届国际大学生程序设计竞赛省赛

比赛链接: https://codeforces.com/gym/105257

榜单链接: https://board.xcpcio.com/provincial-contest%2F2024%2Fshaanxi?group=official

这场感觉打得很烂，差一点就连铜都没有了。赛时通过 ACFGM。

L通过比C多，但是没写出来，队友一直在看B，以后务必三个人只用一台电脑，感觉B也是有机会的。

感觉就C稍微有点难度，其他很签到，但是G卡了很久。。。一直是9的那个样例不对，其他的对的，但是我发现我和别人的代码不太一样。

L , E , B 之后补一下。。

## A

签到

```cpp
void solve()
{
	int x;
	cin>>x;
	auto get=[](int x){
		string s(3,'-');
		if(x>>2&1) s[0]='r';
		if(x>>1&1) s[1]='w';
		if(x&1) s[2]='x';
		return s;
	};
	string res;
	res+=get(x/100);
	x%=100;
	res+=get(x/10);
	res+=get(x%10);
	cout<<res<<'\n';
}
```

## B

也是很妙的一道题哈，我们先按能放 `*` 就放 `*` 的放法构造。

那么有的情况下，有的行或者列会有两个 `11` 出现，那么我们把一个 `11` 连着的 `*` 改成 `+` 显然更优。但是可能会有的行放了，列就不需要放了。

若行数和列数都为偶数，则不需要调整了。

```
8 8
11111111         
1*1*1*11
11*1*1*1
1*1*1*11
11*1*1*1
1*1*1*11
11*1*1*1
11111111
```

再先观察行为偶数，列为奇数的情况，发现只有 3 5 7 这些奇数行都会出现两个 11 的情况，除了第一行和最后一行。那么列是奇数行是偶数的情况显然也是类似的，肯定就是奇数的列需要改。

而全为奇数的就是奇数行和奇数列都需要改。所以我们直接斜着去枚举就好。如果需要改，那就直接改，这样能兼顾行和列，一定可以使得花费最少的 `+` 。

```cpp
void ChatGptDeepSeek()
{
    int n, m;
    cin >> n >> m;
    vector<string> s(n, string(m, '1'));

    for (int i = 1; i < n - 1; i++)
        for (int j = 1; j < m - 1; j++) {
            if (s[i - 1][j] == '1' && s[i + 1][j] == '1' && s[i][j - 1] == '1' && s[i][j + 1] == '1')
                s[i][j] = '*';
        }
    vector<int> r(n), c(m);
    for (int i = 1; i < n - 1; i++) {
        for (int j = 1; j < m; j++) {
            if (s[i][j] == s[i][j - 1])
                r[i]++;
        }
    }
    for (int j = 1; j < m - 1; j++) {
        for (int i = 1; i < n; i++) {
            if (s[i][j] == s[i - 1][j])
                c[j]++;
        }
    }
    for (int i = 2, j = 2; i < n; i += 2) {
        if (s[i][j] == '*' && (r[i] == 2 || c[j] == 2)) {
            r[i] = 0, c[j] = 0;
            // cerr<<i<<" "<<j<<'\n';
            s[i][j] = '+';
            if (j + 2 < m - 1) {
                j += 2;
            }

            // dbg(r);
            // dbg(c);
        }
    }
    for (int j = 2, i = 2; j < m; j += 2) {
        // if(c[j]) cerr<<j<<'\n';
        // dbg(r);
        // dbg(c);
        if (s[i][j] == '*' && (r[i] == 2 || c[j] == 2)) {
            // cerr << i << " " << j << '\n';
            s[i][j] = '+';
            if (i + 2 < n - 1)
                i += 2;
            r[i] = 0, c[j] = 0;
        }
    }
    for (int i = 0; i < n; i++)
        cout << s[i] << '\n';
}
```

## C

每个人的想坐的座位可以建一个图，举个例子吧，比如1想坐2，2想坐3，那么3如果想坐3，则12都只能坐原本的位置；3如果想坐2，那么1只能坐原本的位置；3如果坐在1，那么3个人都可以坐想坐的位置。

其实就是，在环上的点一定是都可以坐在想坐的地方，那么不在环上的点呢？它们都会是在链上，而这些链要么会连到环上，要么会连到 $[n+1,2n]$ 上的点。连在环上显然不可能有合法的方案，所以我们只需要找 $[n+1,2n]$ 每个点连的最长的链。

拿拓扑排序把环上的点找出来再写一个简单的dfs就好了。

```cpp
void solve()
{
    int n;
    cin >> n;
    vector<set<int>> g(n * 2 + 1, set<int>());
    vector<int> a(n + 1), s(n + 1), p(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        g[a[i]].insert(i);
    }
    {
        vector<int> du(n + 1);
        queue<int> q;
        for (int i = 1; i <= n; i++) {
            du[i] = g[i].size();
            if (!du[i]) {
                q.push(i);
            }
        }
        // cerr<<q.size()<<'\n';
        while (!q.empty()) {
            auto x = q.front();
            q.pop();
            if (a[x] > n)
                continue;
            du[a[x]]--;
            if (!du[a[x]]) {
                q.push(a[x]);
            }
        }
        int ans = 0;
        for (int i = 1; i <= n; i++)
            if (du[i])
                ans++;
        for (int i = n + 1; i <= n * 2; i++) {
            int cnt = 0;
            auto dfs = [&](auto&& self, int u, int len) -> void {
                cnt = max(cnt, len);
                for (auto v : g[u]) {
                    self(self, v, len + 1);
                }
            };
            dfs(dfs, i, 1);
            // if (cnt > 1)
            ans += cnt - 1;
        }
        cout << ans << '\n';
    }

    // {
    //     set<int> st;
    //     for (int i = 1; i <= n; i++) {
    //         cout << s[i] << " \n"[i == n];
    //         st.insert(s[i]);
    //         assert(s[i] == i || s[i] == a[i]);
    //     }
    //     assert(st.size() == n);
    // }
}
```

## F

直接输出最大值即可，因为 $\&$ 操作并不能使一个数字为 $0$ 的位变成 $1$ 。

## G

我是写了一个递归的，比较不容易错。。因为我的思路是从高位的往低位删，比如说99 7吧，我们先看最高位，只有1个7，所以我们可以-10，那么我们其实可以直接把当前的数字看成89，因为我们之后只会看后面的位了。然后7是有9个的，$n$ 变成了 80，最后输出 $n+1$ ，因为还有一个 $0$ 。

```cpp
ll ksm(ll a, int b)
{
    ll res = 1;
    while (b) {
        if (b & 1)
            res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
void solve()
{
    ll n;
    int x;
    cin >> n >> x;
    // string s = to_string(n);
    // // 99
    // // 1
    // ll now = n;
    // auto get = [&](int l) {
    //     ll res = 0;
    //     // assert(t.size() == l-1);
    //     for (int i = 0; i < l ; i++)
    //         res = res * 10 + s[i] - '0';
    //     return res;
    // };
    // for (int i = 0; i < s.size(); i++) {
    //     // s = to_string(now);
    //     ll del = get(i);
    //     if (s[i] - '0' >= x)
    //         del++;
    //     now -= del * ksm(10, s.size() - i - 1);
    //     s = to_string(now);
    //     cerr << del << " " << now << '\n';
    // }
    // cout << now + 1 << '\n';
    auto work = [&](auto&& self, ll now, int i) {
        // cerr << now << " " << i << '\n';
        // 删除第i位的 x
        string s = to_string(now);
        if (i==-1) {
            // cout<<s<<"\n";
            cout << now + 1 << '\n';
            return;
        }
        while (s.size() < i)
            s = "0" + s;
        ll del = 0;
        for (int j = 0; j < s.size() - i - 1; j++)
            del = del * 10 + s[j] - '0';
        // cerr << del << " " << i << '\n';
        if (s[s.size() - i - 1] - '0' >= x)
            del++;
        self(self, now - del * ksm(10, i), i - 1);
    };
    work(work, n, to_string(n).size() - 1);
}
```

注释掉的是之前瞎搞的，但是只有9那个输出不对，，然后我发现可能是操作之后数字的位数可能会改变。所以我们用递归可以好写一点，记一下操作的是第多少位。

举个例子，123456，比如我们要删去所有第三位带有2的数字，那么数量就是 $(12+1)\cdot 10^3$ ， +1 是因为当前这一位也是大于2的。

看了题解的思路，大概有两种思路，一种是求出所有的小于等于 $n$ 的数字中， $x$ 出现的次数，这个我还真不会，以后看看吧；另一种就是由于删去了一位数字所以相当于把 $x$ 变为了一个 9 进制数字，所以如果当前这一位大于等于 $x$ 则 -1，否则是不受影响的，再把9进制转为十进制即可。

## L

这么牛。。。

我好像一直都在瞎搞的。

刚开始我想着会不会只有1111和10001这种是可以的。。。应该多举几个例子的，比如 $n$ 为 4567... 答案是多少。

其实先手数字末尾不为0的话，是必赢的。只需要一直拿末尾的数字，因为这样第二个人拿到的始终是末尾为0，他不可能把全部拿完。而末尾不为0，则必输。所以只需要枚举最小的不为 $x$ 因子的数字。 ~~好牛~~

```cpp
void ChatGptDeepSeek()
{
    long long x;
    cin>>x;
    for(int i=2;;i++){
        if(x%i){
            cout<<i<<'\n';
            return;
        }
    }
}
```

## M

每两个相邻的正方形会使面积 -0.5 ，所以直接把面积减去相交的面积就行。

```cpp
void solve()
{
    int n;
    cin >> n;
    set<pair<int, int>> st;
    for (int i = 1; i <= n; i++) {
        int x, y;
        cin >> x >> y;
        st.insert({ x, y });
    }
    double ans = st.size() * 2;
    while (!st.empty()) {
        auto [x, y] = *st.begin();
        st.erase(st.begin());
        if (st.contains({ x - 1, y }))
            ans -= 0.5;
        if (st.contains({ x + 1, y }))
            ans -= 0.5;
        if (st.contains({ x, y - 1 }))
            ans -= 0.5;
        if (st.contains({ x, y + 1 }))
            ans -= 0.5;
    }
    cout << ans << '\n';
}
```

