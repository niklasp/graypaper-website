![JAM Open Graph Image](./static/img/opengraph.png)

# JAM Graypaper Website

## List of Clients

If you want to list your client or update your listing, please request
the change by opening a new issue with the [`Client listing request`](https://github.com/w3f-webops/graypaper-website/issues/new?assignees=&labels=&projects=&template=client-listing-request.md&title=Client+Listing%3A+XYZ) template.

Or even better, directly opening a pull request making the changes yourself. The clients are listed in the [`./src/data/clients.json`](https://github.com/w3f-webops/graypaper-website/blob/main/src/data/clients.json) file.

You can also fetch JSON list of clients file directly from the graypaper.com website for example show this list on your website as well.

```txt
https://graypaper.com/clients/json
```

## Development

### Getting Started

Install dependencies:

```sh
pnpm install
```

Run development server:

```sh
pnpm develop
```

Create production build:

```sh
pnpm build
```

Serve production build:

```sh
pnpm serve
```

### Troubleshooting

There is a [known issue](https://github.com/Automattic/node-canvas/issues/1825#issuecomment-1090125736) with the `node-canvas` package on apple M1 / M2 chips, which is needed for the pdf viewer. If you run into issues try

```sh
pnpm apple-canvas-fix
# "brew install pkg-config cairo pango && pnpm rebuild canvas
```
